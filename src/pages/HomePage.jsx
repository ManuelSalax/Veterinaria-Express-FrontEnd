import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Veterinaria Salud+ Express</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Cuidamos de tus mascotas con amor, tecnología de vanguardia y los más altos estándares de calidad veterinaria.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/citas")}
            className="bg-white text-green-600 font-semibold px-6 py-3 rounded-full hover:bg-green-100 transition"
          >
            🗓️ Agendar Cita
          </button>
          <button
            onClick={() => navigate("/productos")}
            className="bg-transparent border border-white px-6 py-3 rounded-full hover:bg-white hover:text-green-600 transition"
          >
            🛍️ Ver Productos
          </button>
        </div>
      </section>

      {/* Sección de estándares */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-green-700">
          Nuestros Estándares de Calidad
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-600">🏥 Atención Integral</h3>
            <p className="text-gray-600">
              Contamos con profesionales especializados que garantizan un diagnóstico y tratamiento preciso.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-600">🧬 Tecnología Moderna</h3>
            <p className="text-gray-600">
              Equipos de última generación para realizar exámenes, cirugías y tratamientos avanzados.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-green-600">💚 Cuidado Humano</h3>
            <p className="text-gray-600">
              Nos enfocamos en el bienestar y la confianza de tus mascotas con un trato cercano y responsable.
            </p>
          </div>
        </div>
      </section>

      {/* Sección sobre nosotros */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-green-700">
          Conócenos
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          En <span className="font-semibold text-green-600">Veterinaria Salud+ Express</span> trabajamos para ofrecer atención inmediata, diagnósticos confiables y servicios de calidad.  
          Somos más que una clínica, somos una familia dedicada a cuidar la salud y felicidad de tus compañeros de vida.
        </p>
      </section>

      {/* CTA final */}
      <section className="bg-green-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Agenda tu cita hoy mismo</h2>
        <p className="mb-8 text-lg">
          ¡Tu mascota merece la mejor atención veterinaria!
        </p>
        <button
          onClick={() => navigate("/citas")}
          className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition"
        >
          Agendar Cita
        </button>
      </section>
    </div>
  );
};

export default HomePage;
