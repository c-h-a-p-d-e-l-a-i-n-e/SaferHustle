import React from 'react';

export function FAQ() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <header>
        <h1 className="font-poppins text-3xl font-bold mb-4">Aide</h1>
        <p className="font-poppins text-lg mb-6">
          Bienvenue sur la page d'aide de Safer Hustle. Ici, vous trouverez les informations pour naviguer sur notre plateforme, comprendre son fonctionnement et obtenir des réponses aux questions fréquentes.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="font-poppins text-2xl font-semibold">Utiliser la plateforme</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="font-poppins text-xl font-semibold mb-4">Comment signaler un client problématique?</h3>
            
            <p className="font-poppins mb-4">Rendez-vous sur la page dédiée aux dénonciations où vous trouverez un formulaire à remplir.</p>
            
            <p className="font-poppins mb-4">Vous pouvez choisir de signaler un incident de façon anonyme. Dans ce cas, seules votre identité de genre et la région où l'incident a eu lieu seront affichées, sans aucune autres informations personnelles vous concernant.</p>
            
            <p className="font-poppins mb-6">Vous avez aussi la possibilité de fournir en toute sécurité vos coordonnées (nom de travail, courriel et numéro de téléphone) afin d'être mise en relation avec d'autres victimes ayant subi des préjudices similaires du même client.</p>
            
            <h4 className="font-poppins text-lg font-semibold mb-4">Remplir le formulaire de dénonciation</h4>
            
            <p className="font-poppins mb-2">Sélectionnez tous les méfaits commis par votre client lors de votre rencontre.</p>
            
            <p className="font-poppins mb-2">Décrivez en détail la situation et les faits.</p>
            
            <p className="font-poppins mb-2">Indiquez ces informations à l'aide du sélecteur.</p>
            
            <p className="font-poppins mb-4">Précisez la région ou a eu lieu l'incident et si vous faisiez un incall, outcall ou carcall.</p>
            
            <p className="font-poppins mb-6">Une fois le formulaire rempli, cliquez sur « Envoyer ». Votre signalement sera soumis pour modération et publié sur le site dans les heures à venir.</p>
          </div>

          <div>
            <h3 className="font-poppins text-xl font-semibold mb-4">Consulter les signalements</h3>
            
            <p className="font-poppins mb-4">Rendez-vous sur la page des signalements où vous pouvez utiliser des filtres pour affiner votre recherche ou simplement parcourir les signalements du plus récent au plus ancien.</p>
            
            <p className="font-poppins">Cliquez sur un signalement pour voir l'intégralité des détails et les commentaires d'autres utilisatrices et utilisateurs.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-poppins text-2xl font-semibold">Modération et sécurité</h2>
        
        <div className="space-y-6">
          <p className="font-poppins mb-4">Tous les signalements et commentaires sont validés par les administratrices de la plateforme avant publication.</p>
          
          <p className="font-poppins">Notre plateforme utilise une connexion sécurisée (HTTPS) et des mesures de protection strictes pour vos données. Vous pouvez ainsi signaler en toute confidentialité.</p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-poppins text-2xl font-semibold">Dons volontaires</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-poppins text-xl font-semibold mb-2">Pourquoi faire un don?</h3>
            <p className="font-poppins">La plateforme est entièrement gratuite et sans publicité. Elle fonctionne grâce à vos contributions qui permettent de couvrir les frais d'hébergement. Les dons se font entièrement sur une base volontaire.</p>
          </div>

          <div>
            <h3 className="font-poppins text-xl font-semibold mb-2">Comment faire un don?</h3>
            <p className="font-poppins">Rendez-vous dans la section « Faire un don » pour accéder aux options de paiement via un portefeuille de cryptomonnaie.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-poppins text-2xl font-semibold">Questions fréquentes</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-poppins text-xl font-semibold mb-2">Mon signalement restera-t-il anonyme?</h3>
            <p className="font-poppins">Oui. Si vous choisissez de signaler anonymement, il vous sera uniquement demandé de fournir votre identité de genre et la région où l'incident s'est produit.</p>
          </div>

          <div>
            <h3 className="font-poppins text-xl font-semibold mb-2">Que se passe-t-il après la soumission d'une dénonciation?</h3>
            <p className="font-poppins">Elle est conservée pour modération par une administratrice. Une fois validée, elle sera publiée sur la plateforme.</p>
          </div>

          <div>
            <h3 className="font-poppins text-xl font-semibold mb-2">Puis-je modifier ou supprimer mon signalement après l'envoi?</h3>
            <p className="font-poppins">Pour des raisons de sécurité et de traçabilité, toute modification ou suppression doit être réalisée en nous contactant à l'adresse <a href="mailto:info@saferhustle.com" className="text-[#bf273a] hover:underline">info@saferhustle.com</a> ou via le formulaire de contact disponible sur la page « Nous joindre ». Nous travaillerons avec vous pour effectuer rapidement les changements nécessaires.</p>
          </div>

          <div>
            <h3 className="font-poppins text-xl font-semibold mb-2">Comment puis-je soutenir financièrement la plateforme?</h3>
            <p className="font-poppins">Consultez la section « Faire un don » pour découvrir les méthodes de paiement disponibles.</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-poppins text-2xl font-semibold">Assistance supplémentaire</h2>
        
        <div className="space-y-4">
          <p className="font-poppins">Si vous avez besoin d'aide supplémentaire ou si vous rencontrez des difficultés techniques, n'hésitez pas à nous contacter par courriel à info@saferhustle.com ou via le formulaire de contact disponible sur la page « Nous joindre ».</p>
        </div>
      </section>
    </div>
  );
}