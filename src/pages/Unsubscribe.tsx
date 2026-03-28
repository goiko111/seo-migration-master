import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    fetch(`${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: anonKey },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
        } else if (data.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    try {
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center space-y-6">
          {status === "loading" && (
            <p className="text-muted-foreground">Verificando...</p>
          )}
          {status === "valid" && (
            <>
              <h1 className="text-2xl font-bold">Cancelar suscripción</h1>
              <p className="text-muted-foreground">
                ¿Estás seguro de que quieres dejar de recibir emails de Winerim?
              </p>
              <button
                onClick={handleUnsubscribe}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Confirmar cancelación
              </button>
            </>
          )}
          {status === "success" && (
            <>
              <h1 className="text-2xl font-bold">Suscripción cancelada</h1>
              <p className="text-muted-foreground">
                Ya no recibirás más emails de Winerim. Sentimos verte marchar.
              </p>
            </>
          )}
          {status === "already" && (
            <>
              <h1 className="text-2xl font-bold">Ya estás dado de baja</h1>
              <p className="text-muted-foreground">
                Esta dirección de email ya ha sido eliminada de nuestra lista.
              </p>
            </>
          )}
          {status === "invalid" && (
            <>
              <h1 className="text-2xl font-bold">Enlace no válido</h1>
              <p className="text-muted-foreground">
                El enlace de cancelación no es válido o ha expirado.
              </p>
            </>
          )}
          {status === "error" && (
            <>
              <h1 className="text-2xl font-bold">Error</h1>
              <p className="text-muted-foreground">
                Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unsubscribe;
