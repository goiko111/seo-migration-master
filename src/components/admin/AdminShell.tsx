/**
 * AdminShell — wraps the Admin page with AuthProvider.
 * This isolates auth logic from the public bundle so public visitors
 * never download or execute the Supabase auth check.
 */
import { AuthProvider } from "@/contexts/AuthContext";
import Admin from "@/pages/Admin";

const AdminShell = () => (
  <AuthProvider>
    <Admin />
  </AuthProvider>
);

export default AdminShell;
