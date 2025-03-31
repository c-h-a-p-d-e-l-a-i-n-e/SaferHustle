import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Heart, AlertTriangle, Users, Lock } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-16">
      <section 
        className="relative h-[400px] md:h-[250px] -mx-8 px-8 flex items-center justify-center"
      >
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="font-poppins text-[32px] font-bold leading-[40px] mb-6 text-[#bf273a] pt-4">
            Plateforme de dénonciation anonyme
          </h1>
          <p className="font-poppins text-[24px] font-semibold leading-[32px] mb-8 text-[#0a0304]">
            Un espace sécurisé pour signaler des comportements problématiques
            <br />
            <span className="text-[#0a0304] pt-4 inline-block">Montréal et alentours</span>
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/report" 
              className="bg-[#bf273a] text-white px-6 py-3 rounded hover:scale-105 transition-transform duration-200 font-poppins"
            >
              Dénoncer
            </Link>
            <Link 
              to="/reports" 
              className="bg-[#bf273a] text-white px-6 py-3 rounded hover:scale-105 transition-transform duration-200 font-poppins"
            >
              Voir les Signalements
            </Link>
          </div>
        </div>
      </section>

      <div className="grid-container">
        <div className="col-span-4 p-4">
          <AlertTriangle className="w-10 h-10 text-[#bf273a] mb-4" />
          <h3 className="font-poppins text-xl font-semibold mb-2">Signalement Anonyme</h3>
          <p className="font-poppins text-base">
            Déposez vos signalements en toute confidentialité. Votre sécurité est notre priorité absolue.
          </p>
        </div>
        <div className="col-span-4 p-4">
          <Users className="w-10 h-10 text-[#bf273a] mb-4" />
          <h3 className="font-poppins text-xl font-semibold mb-2">Communauté Solidaire</h3>
          <p className="font-poppins text-base">
            Rejoignez une communauté bienveillante et engagée pour la sécurité de tous.
          </p>
        </div>
        <div className="col-span-4 p-4">
          <Lock className="w-10 h-10 text-[#bf273a] mb-4" />
          <h3 className="font-poppins text-xl font-semibold mb-2">Protection des Données</h3>
          <p className="font-poppins text-base">
            Vos informations sont cryptées et protégées selon les plus hauts standards de sécurité.
          </p>
        </div>
      </div>
    </div>
  );
}