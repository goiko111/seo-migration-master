import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const interviews = [
  { quote: "\"¿Un consejo? El vino se entiende mejor desde la práctica constante y la curiosidad.\"", name: "Berta Romero", role: "Sumiller y directora de Restaurante Alameda", excerpt: "Entrevistamos a Berta Romero sobre vinos, emociones y su visión del servicio en sala.", image: "https://winerim.wine/wp-content/uploads/2025/08/Sumilleres-entrevistas-1.png", slug: "/article/berta-romero" },
  { quote: "\"¿Un consejo? Que apuesten por pequeñas bodegas, D.O y zonas vitivinícolas desconocidas, que hay auténticas joyas en formato vínico\"", name: "Paco Martínez Áles", role: "Sommelier – Restaurante Antonio Zahara", excerpt: "Hablamos con Paco, joven sommelier gaditano, responsable de la bodega de Restaurante Antonio Zahara.", image: "https://winerim.wine/wp-content/uploads/2025/05/76.png", slug: "/article/paco-martinez-ales" },
  { quote: "\"¿Un consejo? No os quedéis en el primer sorbo y probad el mismo vino en momentos distintos, con personas diferentes, con distintas comidas.\"", name: "Simone Monese", role: "Sommelier – La Vecchia Griglia, Sirmione", excerpt: "Sostenibilidad, maridajes con alma y el vino como experiencia sensorial.", image: "https://winerim.wine/wp-content/uploads/2025/06/Sumilleres-entrevistas-2.png", slug: "/article/simone-monese" },
  { quote: "\"¿Un consejo? Disfrútenlo abiertamente, no le tengan miedo al vino, no hace falta saber ni conocer de vinos para disfrutarlo. Prueben, descubran y no se arrepentirán.\"", name: "Juan Pérez Vidal", role: "Sumiller – Vinoteca Jaleo", excerpt: "Hablamos con Juan Pérez, sumiller de vinoteca Jaleo, sobre vino, sumillería y cómo Winerim se ha convertido en su compañero ideal.", image: "https://winerim.wine/wp-content/uploads/2025/04/67.png", slug: "/article/juan-perez-vidal" },
  { quote: "\"¿Un consejo? Que investigue, se forme y experimente constantemente aunque sea ilógico lo que pretende\"", name: "Nacho Otamendi", role: "Sumiller – Travieso Bar", excerpt: "Charlamos con Nacho Otamendi, sumiller y alma de Travieso Bar, sobre su forma de entender el vino, la sumillería y su conexión con Winerim.", image: "https://winerim.wine/wp-content/uploads/2025/03/64.png", slug: "/article/nacho-otamendi" },
  { quote: "\"¿Un consejo? Se aprende todos los días, se aprende practicando, y la práctica es muyyyyy divertida.\"", name: "Periko Ortega", role: "Sumiller y chef – ReComiendo", excerpt: "Entrevistamos a Periko Ortega, sumiller y chef en ReComiendo sobre su visión de la sumillería, el vino y Winerim.", image: "https://winerim.wine/wp-content/uploads/2025/02/62.png", slug: "/article/periko-ortega" },
  { quote: "\"¿Un consejo? Nunca dejes de explorar. Cada botella es un mundo, y probar vinos de diferentes regiones, estilos y bodegas enriquece tu conocimiento y disfrute.\"", name: "Omar Oviedo", role: "Sumiller – Oliva Nova Beach & Golf Resort", excerpt: "Entrevistamos a Omar Oviedo, sumiller en Oliva Nova Beach & Golf Resort, responsable de la carta y formador de equipos de trabajo.", image: "https://winerim.wine/wp-content/uploads/2025/01/60.png", slug: "/article/omar-oviedo" },
  { quote: "\"¿Un consejo? Ten respeto por los que elaboran el vino o te lo recomiendan, porque detrás hay muchísimo trabajo e historia.\"", name: "David Paredes", role: "Sumiller – Mesón las Duelas, Algeciras", excerpt: "Entrevistamos a David Paredes, Sumiller en Mesón las Duelas de Algeciras. Hablamos sobre vino, catas, maridajes y Winerim.", image: "https://winerim.wine/wp-content/uploads/2024/11/57.png", slug: "/article/david-paredes" },
  { quote: "\"¿Un consejo? No hace falta saber de vino para disfrutar de él.\"", name: "Álex Pardo", role: "Mejor Sumiller de España 2023 – Restaurante Coque**", excerpt: "Entrevistamos a Álex Pardo, mejor Sumiller de España 2023 y sumiller en Restaurante Coque**.", image: "https://winerim.wine/wp-content/uploads/2024/10/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-18.png", slug: "/article/alex-pardo" },
  { quote: "\"¿Un consejo? El amor es dar y, si es con un buen vino mediante, mejor\"", name: "Daniel Ramos", role: "Sommelier y responsable de formación – Vinófilos", excerpt: "Entrevistamos a Daniel Ramos, Sommelier y responsable de formación en Vinófilos.", image: "https://winerim.wine/wp-content/uploads/2024/09/52.png", slug: "/article/daniel-ramos" },
  { quote: "\"¿Un consejo? Es imprescindible estar formado para entender la esencia, concepto y sentido del vino\"", name: "Xavi Nolla", role: "Sommelier, fundador de enoAula y asesor", excerpt: "Entrevistamos a Xavi Nolla, Sommelier, fundador de enoAula y asesor. Hablamos de vino, catas, maridaje y Winerim.", image: "https://winerim.wine/wp-content/uploads/2024/06/49-1.png", slug: "/article/xavi-nolla" },
  { quote: "\"¿Un consejo? Con el vino, es importante el diálogo con uno mismo y la experiencia en soledad sin interrupciones\"", name: "Joan Gusó", role: "Propietario y sumiller – Mas Gusó", excerpt: "Entrevistamos a Joan Gusó, propietario y sumiller de Mas Gusó para sumergirnos en la historia de su restaurante de la mano del vino.", image: "https://winerim.wine/wp-content/uploads/2024/05/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-15.jpg", slug: "/article/joan-guso" },
  { quote: "\"¿Un consejo? No perdáis nunca la curiosidad por probar vinos desconocidos.\"", name: "Álex Peiró", role: "Sommelier – Restaurante Casamar", excerpt: "Entrevistamos a Álex Peiró, sommelier del Restaurante Casamar, responsable de asegurar que cada comensal tenga una experiencia memorable.", image: "https://winerim.wine/wp-content/uploads/2024/03/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-13.jpg", slug: "/article/alex-peiro" },
  { quote: "\"¿Un consejo? Cata con el corazón.\"", name: "Xavier Valenzuela", role: "Responsable de maridaje – Forat 19", excerpt: "Xavier Valenzuela es el responsable dedicado a hacer que la experiencia de maridaje entre los platos y vinos en Forat 19 sea verdaderamente inolvidable.", image: "https://winerim.wine/wp-content/uploads/2024/02/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-9.jpg", slug: "/article/un-consejo-cata-con-el-corazon" },
  { quote: "\"¿Un consejo? Que nunca deje de apreciar y valorar lo bien hecho, porque así tendremos cada vez mejores vinos.\"", name: "Jorge Soto", role: "Sumiller – Cocinandos*", excerpt: "Hablamos con Jorge Soto, sumiller de Cocinandos*, responsable de que el maridaje sea una experiencia única para el comensal.", image: "https://winerim.wine/wp-content/uploads/2023/03/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-4.jpg", slug: "/article/un-consejo-apreciar-lo-bien-hecho" },
  { quote: "\"¿Un consejo? ¡Hay que probar y salirnos de nuestra zona de confort y, por supuesto, compartir!\"", name: "Manuel Cla", role: "Head Sommelier – Paladar by Zuriñe García, Hotel Boutique Puente Colgante", excerpt: "Manuel Cla es Head Sommelier del Paladar by Zuriñe García, el restaurante ubicado en el Hotel Boutique Puente Colgante.", image: "https://winerim.wine/wp-content/uploads/2023/02/M-Cla.jpg", slug: "/article/un-consejo-salirnos-de-nuestra-zona-de-confort" },
  { quote: "\"¿Un consejo? Prueba vinos nuevos, de otros estilos\"", name: "Elisa Barroso", role: "Sumiller – Sport Hotel Hermitage & Spa, Mejor Sumiller de Cataluña XIX Nariz de Oro", excerpt: "Elisa Barroso es la sumiller al frente de la bodega de Sport Hotel Hermitage & Spa, reconocida como Mejor Sumiller de Cataluña.", image: "https://winerim.wine/wp-content/uploads/2022/12/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-3.jpg", slug: "/article/un-consejo-prueba-vinos-nuevos" },
  { quote: "\"¿Un consejo? Descorchar, probar, compartir\"", name: "Alberto Rodríguez", role: "Responsable de carta de vinos – En la Parra", excerpt: "Alberto Rodríguez es el responsable de la carta de vinos de En la Parra, una cuidada selección de más de 250 referencias.", image: "https://winerim.wine/wp-content/uploads/2022/11/Un-vaso-de-vino-en-el-momento-oportuno-vale-mas-que-todas-las-riquezas-de-la-tierra-2.jpg", slug: "/article/un-consejo-descorchar-probar-compartir" },
];

const SommelierCorner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block"
          >
            Winerim Academy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Sommelier Corner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            En Winerim Academy, hablan todos nuestros expertos. Sumilleres y responsables de vinos de los restaurantes, 
            hoteles, vinotecas, distribuidores y bodegas más importantes del país. Conoce su 
            día a día, consejos, novedades, secretos y cómo es su trabajo diario con Winerim.
          </motion.p>
        </section>

        {/* Interview cards */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 space-y-16">
          {interviews.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={item.slug}
                className={`group grid md:grid-cols-2 gap-8 bg-gradient-card rounded-2xl overflow-hidden border border-border hover:border-wine transition-colors`}
              >
                <div className={`aspect-square md:aspect-auto overflow-hidden ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className={`flex flex-col justify-center p-8 md:p-12 ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                  <blockquote className="font-heading text-xl md:text-2xl font-semibold mb-6 leading-snug italic text-foreground/90">
                    {item.quote}
                  </blockquote>
                  <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                  <div className="mt-auto">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                  <span className="mt-6 text-sm font-semibold tracking-widest uppercase text-accent">
                    Leer entrevista →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SommelierCorner;
