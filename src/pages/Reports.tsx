import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { generateRandomClipPath, generateRandomRotation } from '../utils/paperEffect';

// Generate random effects once for the entire component
const filterEffects = {
  genderSection: {
    background: generateRandomClipPath(),
    rotation: generateRandomRotation()
  },
  typesSection: {
    background: generateRandomClipPath(),
    rotation: generateRandomRotation()
  },
  regionsSection: {
    background: generateRandomClipPath(),
    rotation: generateRandomRotation()
  },
  mainBackground: {
    background: generateRandomClipPath()
  },
  reports: Array(10).fill(null).map(() => ({
    background: generateRandomClipPath(),
    rotation: generateRandomRotation(),
    button: {
      background: generateRandomClipPath(),
      rotation: generateRandomRotation()
    }
  }))
};

const genderOptions = [
  'Féminin',
  'Masculin',
  'Transféminin',
  'Transmasculin',
  'Non-binaire'
];

const incidentTypes = [
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
];

const regions = {
  montreal: [
    'Ahuntsic-Cartierville', 'Anjou', 'Côte-des-Neiges',
    'Lachine', 'LaSalle', 'Le Plateau-Mont-Royal', 'Le Sud-Ouest',
    'L\'île Bizard', 'Hochelaga-Maisonneuve',
    'Montréal-Nord', 'Outremont', 'Pierrefonds-Roxboro',
    'Rivière-des-Prairies', 'Rosemont',
    'Saint-Laurent', 'Saint-Léonard', 'Verdun', 'Ville-Marie',
    'Villeray'
  ],
  north: [
    'Blainville', 'Boisbriand', 'Bois-des-Filion', 'Deux-Montagnes',
    'Lorraine', 'Mascouche', 'Mirabel', 'Rosemère', 'Sainte-Anne-des-Plaines',
    'Sainte-Marthe-sur-le-Lac', 'Sainte-Thérèse', 'Saint-Eustache',
    'Saint-Jérôme', 'Terrebonne'
  ],
  south: [
    'Boucherville', 'Brossard', 'Candiac', 'Chambly', 'Châteauguay',
    'Delson', 'La Prairie', 'Longueuil', 'Saint-Bruno-de-Montarville',
    'Saint-Constant', 'Sainte-Catherine', 'Sainte-Julie',
    'Saint-Lambert', 'Varennes'
  ]
};

interface Report {
  id: string;
  gender: string;
  problemType: string[];
  location: string;
  date: string;
  description: string;
  comments?: {
    id: string;
    text: string;
    date: string;
  }[];
}

const mockReports: Report[] = [
  {
    id: "R2024001",
    gender: "Féminin",
    problemType: ["Violence physique", "Vol"],
    location: "Montréal - Le Plateau-Mont-Royal",
    date: "2024-03-15",
    description: "Description de l'incident...",
    comments: [
      {
        id: "C1",
        text: "Commentaire de modération...",
        date: "2024-03-16"
      }
    ]
  },
  {
    id: "R2024002",
    gender: "Non-binaire",
    problemType: ["Harcèlement"],
    location: "Laval - Saint-François",
    date: "2024-03-14",
    description: "Description de l'incident...",
    comments: []
  },
  {
    id: "R2024003",
    gender: "Transféminin",
    problemType: ["Menaces"],
    location: "Longueuil - Vieux-Longueuil",
    date: "2024-03-13",
    description: "Description de l'incident...",
    comments: []
  }
];

export function Reports() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedReports = [...mockReports].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleGenderToggle = (gender: string) => {
    setSelectedGenders(prev =>
      prev.includes(gender)
        ? prev.filter(g => g !== gender)
        : [...prev, gender]
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleRegionToggle = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Filters Section - Mobile */}
      <div className="md:hidden w-full">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between px-4 py-2 bg-[#bf273a] text-[#ffddb9] rounded"
        >
          <span className="flex items-center gap-2">
            <Filter size={20} />
            Filtres
          </span>
          <ChevronDown
            size={20}
            className={`transform transition-transform duration-300 ${
              showFilters ? 'rotate-180' : ''
            }`}
          />
        </button>

        {showFilters && (
          <div className="mt-4 p-4 bg-[#ffddb9] border border-[#bf273a] rounded">
            <FilterContent
              selectedGenders={selectedGenders}
              onGenderToggle={handleGenderToggle}
              selectedTypes={selectedTypes}
              onTypeToggle={handleTypeToggle}
              selectedRegions={selectedRegions}
              onRegionToggle={handleRegionToggle}
            />
          </div>
        )}
      </div>

      {/* Filters Section - Desktop */}
      <div className="hidden md:block w-[340px] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-[#ffddb9]"
          style={{
            clipPath: filterEffects.mainBackground.background,
            zIndex: 0
          }}
        ></div>
        <div className="relative z-10 p-6">
          <div className="relative mb-6">
            <div 
              className="absolute inset-0 bg-[#bf273a]"
              style={{
                clipPath: generateRandomClipPath(),
                transform: generateRandomRotation()
              }}
            ></div>
            <div className="relative z-10 p-6 text-[#ffddb9]">
              <h3 className="font-semibold text-lg mb-4 flex items-center justify-center gap-4">
                <div className="h-[1px] w-[40px] bg-[#ffddb9] translate-y-[1px]"></div>
                <span className="whitespace-nowrap">Niveaux de risque</span>
                <div className="h-[1px] w-[80px] bg-[#ffddb9] translate-y-[1px]"></div>
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pl-4">
                  <img 
                    src="/icons/risque-modere-FFDDB9.png" 
                    alt="Risque modéré" 
                    className="w-6 h-6"
                  />
                  <span>Modéré</span>
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <img 
                    src="/icons/risque-eleve-FFDDB9.png" 
                    alt="Risque élevé" 
                    className="w-6 h-6"
                  />
                  <span>Élevé</span>
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <img 
                    src="/icons/recidiviste-FFDDB9.png" 
                    alt="Récidiviste" 
                    className="w-6 h-6"
                  />
                  <span>Récidiviste</span>
                </div>
              </div>
            </div>
          </div>
          <FilterContent
            selectedGenders={selectedGenders}
            onGenderToggle={handleGenderToggle}
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
            selectedRegions={selectedRegions}
            onRegionToggle={handleRegionToggle}
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setSortOrder('desc')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              sortOrder === 'desc' ? 'bg-[#bf273a] text-[#ffddb9]' : 'text-[#0a0304] hover:bg-[#bf273a] hover:text-[#ffddb9]'
            }`}
          >
            Plus récent
          </button>
          <button
            onClick={() => setSortOrder('asc')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              sortOrder === 'asc' ? 'bg-[#bf273a] text-[#ffddb9]' : 'text-[#0a0304] hover:bg-[#bf273a] hover:text-[#ffddb9]'
            }`}
          >
            Plus ancien
          </button>
        </div>

        <div className="space-y-4">
          {sortedReports.map((report, index) => (
            <div
              key={report.id}
              className="relative mb-6"
              style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}
            >
              <div 
                className="absolute inset-0 bg-[#bf273a]"
                style={{
                  clipPath: filterEffects.reports[index % filterEffects.reports.length].background,
                  transform: filterEffects.reports[index % filterEffects.reports.length].rotation,
                  zIndex: 1
                }}
              ></div>
              <div 
                className="absolute inset-[2px] bg-[#ffddb9]"
                style={{
                  clipPath: filterEffects.reports[index % filterEffects.reports.length].background,
                  transform: filterEffects.reports[index % filterEffects.reports.length].rotation,
                  zIndex: 2
                }}
              ></div>
              <div className="relative z-10 p-6">
                <h3 className="font-poppins text-lg font-bold text-[#0a0304] mb-2">
                  {report.gender} · {report.location}
                </h3>
                  
                <div className="flex flex-wrap gap-2 mb-2">
                  {report.problemType.map((type) => (
                    <span
                      key={type}
                      className="text-base font-poppins text-[#0a0304]"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                  
                <p className="text-sm font-poppins text-[#0a0304] mb-4">
                  {new Date(report.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                
                <div className="flex gap-2 mb-4">
                  <img 
                    src="/icons/risque-modere-BF273A.png" 
                    alt="Risque modéré" 
                    className="w-6 h-6"
                  />
                </div>

                <Link 
                  to={`/reports/${report.id}`}
                  className="bg-[#bf273a] text-[#ffddb9] px-4 py-2 rounded hover:scale-105 transition-transform duration-200 inline-block"
                >
                  Voir les détails
                </Link>

                {report.comments && report.comments.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-[#bf273a]">
                    {report.comments.map((comment) => (
                      <div key={comment.id} className="text-base font-poppins text-[#0a0304]">
                        {comment.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FilterContentProps {
  selectedGenders: string[];
  onGenderToggle: (gender: string) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  selectedRegions: string[];
  onRegionToggle: (region: string) => void;
}

function FilterContent({
  selectedGenders,
  onGenderToggle,
  selectedTypes,
  onTypeToggle,
  selectedRegions,
  onRegionToggle,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div></div>
        <div 
          className="absolute inset-0 bg-[#bf273a]"
          style={{
            clipPath: filterEffects.genderSection.background,
            transform: filterEffects.genderSection.rotation
          }}
        ></div>
        <div className="relative z-10 p-8 text-[#ffddb9]">
          <h3 className="font-semibold text-lg mb-4 flex items-center justify-center gap-4">
            <div className="h-[1px] w-[40px] bg-[#ffddb9] translate-y-[1px]"></div>
            <span className="whitespace-nowrap">Genre de la victime</span>
            <div className="h-[1px] w-[80px] bg-[#ffddb9] translate-y-[1px]"></div>
          </h3>
          <div className="space-y-3 py-4">
            {genderOptions.map(gender => (
              <label key={gender} className="checkbox-container block">
                <input
                  type="checkbox"
                  checked={selectedGenders.includes(gender)}
                  onChange={() => onGenderToggle(gender)}
                />
                <span className="checkmark"></span>
                <span className="text-sm">{gender}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div 
          className="absolute inset-0 bg-[#bf273a]"
          style={{
            clipPath: filterEffects.typesSection.background,
            transform: filterEffects.typesSection.rotation
          }}
        ></div>
        <div className="relative z-10 p-8 text-[#ffddb9] w-full">
          <h3 className="font-semibold text-lg mb-4 flex items-center justify-center gap-4">
            <div className="h-[1px] w-[40px] bg-[#ffddb9] translate-y-[1px]"></div>
            <span className="whitespace-nowrap">Motifs de signalement</span>
            <div className="h-[1px] w-[80px] bg-[#ffddb9] translate-y-[1px]"></div>
          </h3>
          <div className="space-y-3 py-4">
            {incidentTypes.map(type => (
              <label key={type.value} className="checkbox-container block whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.value)}
                  onChange={() => onTypeToggle(type.value)}
                />
                <span className="checkmark"></span>
                <span className="text-sm">{type.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div 
          className="absolute inset-0 bg-[#bf273a]"
          style={{
            clipPath: filterEffects.regionsSection.background,
            transform: filterEffects.regionsSection.rotation
          }}
        ></div>
        <div className="relative z-10 p-8 text-[#ffddb9] w-full">
          <h3 className="font-semibold text-lg mb-4 flex items-center justify-center gap-4">
            <div className="h-[1px] w-[40px] bg-[#ffddb9] translate-y-[1px]"></div>
            <span className="whitespace-nowrap">Région</span>
            <div className="h-[1px] w-[80px] bg-[#ffddb9] translate-y-[1px]"></div>
          </h3>
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <h4 className="font-medium text-base">Île de Montréal</h4>
              <div className="space-y-2">
                {regions.montreal.map(region => (
                  <label key={region} className="checkbox-container block whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(region)}
                      onChange={() => onRegionToggle(region)}
                    />
                    <span className="checkmark"></span>
                    <span className="text-sm">{region}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-base">Rive-Nord de Montréal</h4>
              <div className="space-y-2">
                {regions.north.map(region => (
                  <label key={region} className="checkbox-container block whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(region)}
                      onChange={() => onRegionToggle(region)}
                    />
                    <span className="checkmark"></span>
                    <span className="text-sm">{region}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-base">Rive-Sud de Montréal</h4>
              <div className="space-y-2 pb-[60px]">
                {regions.south.map(region => (
                  <label key={region} className="checkbox-container block whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(region)}
                      onChange={() => onRegionToggle(region)}
                    />
                    <span className="checkmark"></span>
                    <span className="text-sm">{region}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}