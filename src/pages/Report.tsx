import React, { useState } from 'react';
import { getStaticPattern } from '../utils/staticPaperEffects';

type Region = 'montreal' | 'north' | 'south' | '';
type ReportMode = 'anonymous' | 'contact';

interface FormData {
  mode: ReportMode;
  name?: string;
  email?: string;
  phone?: string;
  gender: string;
  consentToShare: boolean;
  problemTypes: string[];
  description: string;
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  region: string;
}

interface ReportProps {
  initialData?: FormData;
  onCancel?: () => void;
  onSubmit?: (data: FormData) => void;
}

const montrealDistricts = [
  'Ahuntsic-Cartierville', 'Anjou', 'Côte-des-Neiges–Notre-Dame-de-Grâce',
  'Lachine', 'LaSalle', 'Le Plateau-Mont-Royal', 'Le Sud-Ouest',
  'L\'Île-Bizard–Sainte-Geneviève', 'Mercier–Hochelaga-Maisonneuve',
  'Montréal-Nord', 'Outremont', 'Pierrefonds-Roxboro', 'Rivière-des-Prairies–Pointe-aux-Trembles',
  'Rosemont–La Petite-Patrie', 'Saint-Laurent', 'Saint-Léonard',
  'Verdun', 'Ville-Marie', 'Villeray–Saint-Michel–Parc-Extension'
];

const northShore = [
  'Blainville', 'Boisbriand', 'Bois-des-Filion', 'Deux-Montagnes',
  'Lorraine', 'Mascouche', 'Mirabel', 'Rosemère', 'Sainte-Anne-des-Plaines',
  'Sainte-Marthe-sur-le-Lac', 'Sainte-Thérèse', 'Saint-Eustache',
  'Saint-Jérôme', 'Terrebonne'
];

const southShore = [
  'Boucherville', 'Brossard', 'Candiac', 'Chambly', 'Châteauguay',
  'Delson', 'La Prairie', 'Longueuil', 'Saint-Bruno-de-Montarville',
  'Saint-Constant', 'Sainte-Catherine', 'Sainte-Julie',
  'Saint-Lambert', 'Varennes'
];

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - i);
};

const generateHours = () => {
  return Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}h`);
};

const generateMinutes = () => {
  return ['00', '15', '30', '45'];
};

export function Report({ initialData, onCancel, onSubmit }: ReportProps) {
  const [formData, setFormData] = useState<FormData>(initialData || {
    mode: 'anonymous',
    gender: '',
    consentToShare: false,
    problemTypes: [],
    description: '',
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    region: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Form submitted:', formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Format phone number as ###-###-####
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      const formatted = match ? `${match[1]}-${match[2]}-${match[3]}` : cleaned;
      setFormData(prev => ({ ...prev, phone: formatted }));
      return;
    }

    if (name === 'email') {
      setFormData(prev => ({ ...prev, email: value }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModeChange = (mode: ReportMode) => {
    setFormData(prev => ({ ...prev, mode }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      problemTypes: prev.problemTypes.includes(value)
        ? prev.problemTypes.filter(type => type !== value)
        : [...prev.problemTypes, value]
    }));
  };

  return (
    <div className="max-w-[864px] mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative mb-8" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}>
          <div
            className="absolute inset-0 bg-[#bf273a]"
            style={{
              clipPath: getStaticPattern(0).clipPath,
              transform: getStaticPattern(0).rotation,
              zIndex: 1
            }}
          ></div>
          <div className="relative z-10 p-8">
            <div className="text-sm text-center space-y-2">
              <p className="mb-0 text-[#ffddb9]">On comprend que ça puisse être difficile à écrire.</p>
              <p className="mb-0 text-[#ffddb9]">Si tu préfères en parler de vive voix et être écouté·e sans jugement,</p>
              <p className="mb-0 text-[#ffddb9]">tu peux nous joindre par courriel et prendre rendez-vous avec une modératrice.</p>
              <p className="mb-0 text-[#ffddb9]">Sache que notre plateforme est tenue avec coeur, par et pour des travailleuses et travailleurs du sexe.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6 pt-12">
          <div className="h-[1px] w-[120px] bg-[#bf273a] translate-y-[1px]"></div>
          <p className="font-semibold text-center whitespace-nowrap mb-0">Quel est ton genre?</p>
          <div className="h-[1px] w-[120px] bg-[#bf273a] translate-y-[1px]"></div>
        </div>

        <div className="relative mb-8" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}>
          <div
            className="absolute inset-0 bg-[#bf273a]"
            style={{
              clipPath: getStaticPattern(1).clipPath,
              transform: getStaticPattern(1).rotation,
              zIndex: 1
            }}
          ></div>
          <div className="relative z-10 grid grid-cols-5 gap-4 p-8">
            {[
              'Féminin',
              'Masculin',
              'Transféminin',
              'Transmasculin',
              'Non-binaire'
            ].map((gender) => (
              <label key={gender} className="checkbox-container whitespace-nowrap text-[#ffddb9]">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                />
                <span className="checkmark border-[#ffddb9]"></span>
                <span className="text-sm">{gender}</span>
              </label>
            ))}
          </div>
        </div>


        <div className="space-y-2 mb-6 mt-8">
          <div className="flex items-center justify-center gap-4 mb-6 pt-12">
            <div className="h-[1px] w-[120px] bg-[#bf273a] translate-y-[1px]"></div>
            <p className="font-semibold text-center whitespace-nowrap mb-0">De quoi as-tu été victime?</p>
            <div className="h-[1px] w-[120px] bg-[#bf273a] translate-y-[1px]"></div>
          </div>
          <p className="text-sm text-center pb-4 text-[#0a0304]">Coche toutes les situations applicables</p>
          <div className="relative" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}>
            <div
              className="absolute inset-0 bg-[#bf273a]"
              style={{
                clipPath: getStaticPattern(2).clipPath,
                transform: getStaticPattern(2).rotation,
                zIndex: 1
              }}
            ></div>
            <div className="relative z-10 grid grid-cols-3 gap-x-4 gap-y-4 p-8">
              {[
                { value: 'absence_non_justifiee', label: 'Absence non justifiée' },
                { value: 'agression_sexuelle', label: 'Agression sexuelle' },
                { value: 'chantage', label: 'Chantage' },
                { value: 'denigrement', label: 'Dénigrement' },
                { value: 'harcelement_personne', label: 'Harcèlement en personne' },
                { value: 'harcelement_telephone', label: 'Harcèlement au téléphone' },
                { value: 'intimidation', label: 'Intimidation' },
                { value: 'menaces', label: 'Menaces' },
                { value: 'menaces_mort', label: 'Menaces de mort' },
                { value: 'non_respect_limites', label: 'Non-respect des limites' },
                { value: 'non_respect_tarifs', label: 'Non-respect des tarifs convenus' },
                { value: 'photo_video', label: 'Photos/vidéos non consenties' },
                { value: 'retrait_condom', label: 'Retrait du condom' },
                { value: 'sequestration', label: 'Séquestration' },
                { value: 'violence_physique', label: 'Violence physique' },
                { value: 'violence_verbale', label: 'Violence verbale' },
                { value: 'vol', label: 'Vol d\'argent ou de biens' },
                { value: 'vol_services', label: 'Vol de services' }
              ].map(({ value, label }) => (
                <label key={value} className="checkbox-container whitespace-nowrap text-[#ffddb9]">
                  <input
                    type="checkbox"
                    checked={formData.problemTypes.includes(value)}
                    onChange={() => handleCheckboxChange(value)}
                  />
                  <span className="checkmark border-[#ffddb9]"></span>
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mb-6 pt-12">
          <div className="h-[1px] w-[120px] bg-[#bf273a] translate-y-[1px]"></div>
          <p className="font-semibold text-center whitespace-nowrap mb-0">C'est arrivé quand?</p>
          <div className="h-[1px] w-[120px] bg-[#bf273a] translate-y-[1px]"></div>
        </div>

        <div className="flex gap-2 relative">
          <div className="w-[12.75%] relative" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.65))' }}>
            <div
              className="absolute inset-0 bg-[#bf273a]"
              style={{
                clipPath: getStaticPattern(3).clipPath,
                transform: getStaticPattern(3).rotation,
                zIndex: 1
              }}
            ></div>
            <select
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              className="relative z-10 w-full h-[40px] bg-transparent text-[#ffddb9] border-none focus:outline-none appearance-none px-8 py-0"
            >
              <option value="" className="bg-[#bf273a]">Jour</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, '0')} className="bg-[#bf273a]">
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-[21.25%] relative" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}>
            <div
              className="absolute inset-0 bg-[#bf273a]"
              style={{
                clipPath: getStaticPattern(4).clipPath,
                transform: getStaticPattern(4).rotation,
                zIndex: 1
              }}
            ></div>
            <select
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className="relative z-10 w-full h-[40px] bg-transparent text-[#ffddb9] border-none focus:outline-none appearance-none px-8 py-0"
            >
              <option value="" className="bg-[#bf273a]">Mois</option>
              <option value="01" className="bg-[#bf273a]">Janvier</option>
              <option value="02" className="bg-[#bf273a]">Février</option>
              <option value="03" className="bg-[#bf273a]">Mars</option>
              <option value="04" className="bg-[#bf273a]">Avril</option>
              <option value="05" className="bg-[#bf273a]">Mai</option>
              <option value="06" className="bg-[#bf273a]">Juin</option>
              <option value="07" className="bg-[#bf273a]">Juillet</option>
              <option value="08" className="bg-[#bf273a]">Août</option>
              <option value="09" className="bg-[#bf273a]">Septembre</option>
              <option value="10" className="bg-[#bf273a]">Octobre</option>
              <option value="11" className="bg-[#bf273a]">Novembre</option>
              <option value="12" className="bg-[#bf273a]">Décembre</option>
            </select>
          </div>
          
          <div className="w-[17%] relative" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}>
            <div
              className="absolute inset-0 bg-[#bf273a]"
              style={{
                clipPath: getStaticPattern(5).clipPath,
                transform: getStaticPattern(5).rotation,
                zIndex: 1
              }}
            ></div>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="relative z-10 w-full h-[40px] bg-transparent text-[#ffddb9] border-none focus:outline-none appearance-none px-8 py-0"
            >
              <option value="" className="bg-[#bf273a]">Année</option>
              {generateYears().map(year => (
                <option key={year} value={year} className="bg-[#bf273a]">{year}</option>
              ))}
            </select>
          </div>

          <div className="flex-grow"></div>

          <div className="w-[17%] relative" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}>
            <div
              className="absolute inset-0 bg-[#bf273a]"
              style={{
                clipPath: getStaticPattern(6).clipPath,
                transform: getStaticPattern(6).rotation,
                zIndex: 1
              }}
            ></div>
            <select
              name="hour"
              value={formData.hour}
              onChange={handleInputChange}
              className="relative z-10 w-full h-[40px] bg-transparent text-[#ffddb9] border-none focus:outline-none appearance-none px-8 py-0"
            >
              <option value="" className="bg-[#bf273a]">Heure</option>
              {generateHours().map(hour => (
                <option key={hour} value={hour} className="bg-[#bf273a]">{hour}</option>
              ))}
            </select>
          </div>
          
          <div className="w-[17%] relative" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}>
            <div
              className="absolute inset-0 bg-[#bf273a]"
              style={{
                clipPath: getStaticPattern(7).clipPath,
                transform: getStaticPattern(7).rotation,
                zIndex: 1
              }}
            ></div>
            <select
              name="minute"
              value={formData.minute}
              onChange={handleInputChange}
              className="relative z-10 w-full h-[40px] bg-transparent text-[#ffddb9] border-none focus:outline-none appearance-none px-8 py-0"
            >
              <option value="" className="bg-[#bf273a]">Minute</option>
              {generateMinutes().map(minute => (
                <option key={minute} value={minute} className="bg-[#bf273a]">{minute}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6 pt-12">
          <div className="h-[1px] w-[120px] bg-[#bf273a] translate-y-[1px]"></div>
          <p className="font-semibold text-center whitespace-nowrap mb-0">C'est arrivé où?</p>
          <div className="h-[1px] w-[120px] bg-[#bf273a] translate-y-[1px]"></div>
        </div>

        <div className="relative" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}>
          <div
            className="absolute inset-0 bg-[#bf273a]"
            style={{
              clipPath: getStaticPattern(8).clipPath,
              transform: getStaticPattern(8).rotation,
              zIndex: 1
            }}
          ></div>
          <select
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="relative z-10 w-full h-[40px] bg-transparent text-[#ffddb9] border-none focus:outline-none appearance-none px-8 py-0"
          >
            <option value="" className="bg-[#bf273a]">Sélectionner une région</option>
            <optgroup label="Île de Montréal" className="bg-[#bf273a]">
              {montrealDistricts.map(district => (
                <option key={district} value={district} className="bg-[#bf273a]">{district}</option>
              ))}
            </optgroup>
            <optgroup label="Rive-Nord" className="bg-[#bf273a]">
              {northShore.map(city => (
                <option key={city} value={city} className="bg-[#bf273a]">{city}</option>
              ))}
            </optgroup>
            <optgroup label="Rive-Sud" className="bg-[#bf273a]">
              {southShore.map(city => (
                <option key={city} value={city} className="bg-[#bf273a]">{city}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6 pt-12">
          <div className="h-[1px] w-[120px] bg-[#bf273a] translate-y-[1px]"></div>
          <p className="font-semibold text-center whitespace-nowrap mb-0">Description de l'incident</p>
          <div className="h-[1px] w-[120px] bg-[#bf273a] translate-y-[1px]"></div>
        </div>

        <div className="relative" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}>
          <div
            className="absolute inset-0 bg-[#bf273a]"
            style={{
              clipPath: getStaticPattern(9).clipPath,
              transform: getStaticPattern(9).rotation,
              zIndex: 1
            }}
          ></div>
          <textarea
            name="description"
            placeholder="Description détaillée de l'incident"
            value={formData.description}
            onChange={handleInputChange}
            className="relative z-10 w-full h-[120px] p-8 bg-transparent border-none focus:outline-none resize-none text-[#ffddb9] placeholder-[#ffddb9]/60"
          />
        </div>

        <div className="flex gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-[#bf273a] text-[#bf273a] py-3 px-6 rounded font-poppins text-base hover:scale-105 transition-transform duration-200"
            >
              Annuler
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-[#bf273a] text-[#ffddb9] py-3 px-6 rounded font-poppins text-base hover:scale-105 transition-transform duration-200"
          >
            {initialData ? 'Enregistrer les modifications' : 'Envoyer le signalement'}
          </button>
        </div>
      </form>
    </div>
  );
}