import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Edit, 
  Calendar,
  AlertTriangle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Search,
  Clock
} from 'lucide-react';
import { generateRandomClipPath, generateRandomRotation } from '../utils/paperEffect';
import { Report } from './Report';
import { Modal } from '../components/Modal';

// Generate random effects once for the entire component
const filterEffects = {
  reports: Array(10).fill(null).map(() => ({
    background: generateRandomClipPath(),
    rotation: generateRandomRotation()
  }))
};

type SubmissionType = 'report' | 'comment';
type Status = 'pending' | 'approved' | 'rejected';
interface RiskLevel {
  severity: 'moderate' | 'high';
  isRepeat: boolean;
}

interface Submission {
  id: string;
  type: SubmissionType;
  title: string;
  content: string;
  date: string;
  status: Status;
  gender?: string;
  location?: string;
  problemTypes?: string[];
  riskLevel?: 'low' | 'medium' | 'high';
}

const mockSubmissions: Submission[] = [
  {
    id: 'S001',
    type: 'report',
    title: 'Violence physique - Plateau Mont-Royal',
    content: 'Signalement pour violence physique dans le secteur Plateau Mont-Royal',
    date: '2024-03-20',
    status: 'pending',
    gender: 'Féminin',
    location: 'Le Plateau-Mont-Royal',
    problemTypes: ['Violence physique', 'Vol'],
    riskLevel: 'high'
  },
  {
    id: 'S002',
    type: 'comment',
    title: 'Commentaire sur signalement #R2024001',
    content: 'J\'ai eu une expérience similaire dans ce secteur',
    date: '2024-03-19',
    status: 'pending'
  }
];

export function Admin() {
  const [selectedType, setSelectedType] = useState<SubmissionType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);
  const [editingReport, setEditingReport] = useState<string | null>(null);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel>({
    severity: 'moderate',
    isRepeat: false
  });

  const handleStatusChange = (id: string, newStatus: Status) => {
    console.log(`Changed status of ${id} to ${newStatus}`);
    // Here you would update the status in your database
  };

  const handleApproveClick = (id: string) => {
    setSelectedSubmissionId(id);
    setShowRiskModal(true);
    setSelectedRisk({ severity: 'moderate', isRepeat: false });
  };

  const handleApproveWithRisk = () => {
    if (selectedSubmissionId) {
      console.log(`Approving ${selectedSubmissionId} with risk:`, selectedRisk);
      handleStatusChange(selectedSubmissionId, 'approved');
      setShowRiskModal(false);
      setSelectedSubmissionId(null);
    }
  };

  const handleReject = (id: string) => {
    handleStatusChange(id, 'rejected');
  };

  const handleEdit = (id: string) => {
    setEditingReport(id);
  };

  if (editingReport) {
    const report = mockSubmissions.find(s => s.id === editingReport && s.type === 'report');
    if (report) {
      return (
        <Report 
          initialData={{
            mode: 'anonymous',
            gender: report.gender || '',
            problemTypes: report.problemTypes?.map(type => {
              switch (type) {
                case 'Violence physique': return 'violence_physique';
                case 'Vol': return 'vol';
                // Add other mappings as needed
                default: return '';
              }
            }).filter(Boolean) || [],
            description: report.content,
            region: report.location || '',
            day: '',
            month: '',
            year: '',
            hour: '',
            minute: '',
            consentToShare: false
          }}
          onCancel={() => setEditingReport(null)}
          onSubmit={(data) => {
            console.log('Updated report:', data);
            setEditingReport(null);
          }}
        />
      );
    }
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[#ffddb9] p-6">
        <div className="flex items-center gap-6 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedType('report')}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                selectedType === 'report' ? 'bg-[#bf273a] text-[#ffddb9]' : 'text-[#0a0304] hover:bg-[#bf273a] hover:text-[#ffddb9]'
              }`}
            >
              Signalements
            </button>
            <button
              onClick={() => setSelectedType('comment')}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                selectedType === 'comment' ? 'bg-[#bf273a] text-[#ffddb9]' : 'text-[#0a0304] hover:bg-[#bf273a] hover:text-[#ffddb9]'
              }`}
            >
              Commentaires
            </button>
          </div>

          <div className="flex items-center gap-2 ml-6">
            <button
              onClick={() => setSelectedStatus('pending')}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                selectedStatus === 'pending' ? 'bg-[#bf273a] text-[#ffddb9]' : 'text-[#0a0304] hover:bg-[#bf273a] hover:text-[#ffddb9]'
              }`}
            >
              En attente
            </button>
            <button
              onClick={() => setSelectedStatus('approved')}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                selectedStatus === 'approved' ? 'bg-[#bf273a] text-[#ffddb9]' : 'text-[#0a0304] hover:bg-[#bf273a] hover:text-[#ffddb9]'
              }`}
            >
              Confirmés
            </button>
            <button
              onClick={() => setSelectedStatus('rejected')}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                selectedStatus === 'rejected' ? 'bg-[#bf273a] text-[#ffddb9]' : 'text-[#0a0304] hover:bg-[#bf273a] hover:text-[#ffddb9]'
              }`}
            >
              Refusés
            </button>
          </div>

          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#ffddb9]" />
            <input 
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[240px] h-[40px] bg-[#bf273a] text-[#ffddb9] border-none rounded px-10 focus:outline-none text-sm placeholder-[#ffddb9]/60"
            />
          </div>

          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 text-[#0a0304] hover:opacity-80 transition-opacity duration-200"
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm">Trier par date</span>
            {sortOrder === 'asc' ? (
              <ChevronUp className="w-4 h-4 ml-auto" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-auto" />
            )}
          </button>
        </div>
      </div>

      <div className="p-8 max-w-[1200px] mx-auto">
        <h1 className="font-poppins text-[32px] font-bold mb-8">Administration</h1>

        <div className="space-y-4">
          {mockSubmissions.map((submission) => (
            <div
              key={submission.id}
              className="relative mb-6"
              style={{
                filter: 'drop-shadow(6px 6px 0 #bf273a)'
              }}
            >
              <div 
                className="absolute inset-0 bg-[#ffddb9] border-[3px] border-[#bf273a]"
                style={{
                  clipPath: generateRandomClipPath(),
                  transform: generateRandomRotation(),
                  zIndex: 1
                }}
              ></div>
              <div className="relative z-10 p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {submission.type === 'report' ? (
                      <AlertTriangle className={`w-5 h-5 ${
                        submission.riskLevel === 'high' ? 'text-[#bf273a]' : 'text-[#bf273a]'
                      }`} />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-[#bf273a]" />
                    )}
                    <span className="font-semibold text-[#0a0304]">
                      {submission.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#0a0304]" />
                    <span className="text-sm text-[#0a0304]">
                      {new Date(submission.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                {submission.type === 'report' && (
                  <div className="mb-4 text-sm text-[#0a0304]">
                    <span>{submission.gender}</span>
                    <span className="mx-2">•</span>
                    <span>{submission.location}</span>
                    {submission.problemTypes && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{submission.problemTypes.join(', ')}</span>
                      </>
                    )}
                  </div>
                )}

                <div 
                  className={`mb-6 transition-all duration-300 ${
                    expandedSubmission === submission.id ? 'max-h-none' : 'max-h-[3em] overflow-hidden'
                  }`}
                >
                  <p className="text-[#0a0304]">{submission.content}</p>
                </div>

                {submission.content.length > 150 && (
                  <button
                    onClick={() => setExpandedSubmission(
                      expandedSubmission === submission.id ? null : submission.id
                    )}
                    className="text-sm mb-6 hover:underline text-[#0a0304]"
                  >
                    {expandedSubmission === submission.id ? 'Voir moins' : 'Voir plus'}
                  </button>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApproveClick(submission.id)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-[#bf273a] text-[#bf273a] rounded hover:scale-105 transition-all duration-250 hover:bg-[#bf273a] hover:text-[#ffddb9]"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Approuver</span>
                  </button>
                  <button
                    onClick={() => handleEdit(submission.id)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-[#bf273a] text-[#bf273a] rounded hover:scale-105 transition-all duration-250 hover:bg-[#bf273a] hover:text-[#ffddb9]"
                  >
                    <Edit className="w-5 h-5" />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={() => handleReject(submission.id)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-[#bf273a] text-[#bf273a] rounded hover:scale-105 transition-all duration-250 hover:bg-[#bf273a] hover:text-[#ffddb9]"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Refuser</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal isOpen={showRiskModal} onClose={() => {
          setShowRiskModal(false);
          setSelectedSubmissionId(null);
        }}>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6 text-[#0a0304]">Choisir le niveau de risque</h3>
            <div className="space-y-4">
              <div className="space-y-2 mb-6">
                <p className="text-[#0a0304] font-semibold mb-4">Niveau de risque</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedRisk(prev => ({ ...prev, severity: 'moderate' }))}
                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded transition-all duration-200 ${
                      selectedRisk.severity === 'moderate'
                        ? 'bg-[#bf273a] text-[#ffddb9]'
                        : 'bg-[#ffddb9] text-[#bf273a] border border-[#bf273a]'
                    }`}
                  >
                    <img 
                      src={`/icons/risque-modere-${selectedRisk.severity === 'moderate' ? 'FFDDB9' : 'BF273A'}.png`}
                      alt="Risque modéré" 
                      className="w-6 h-6"
                    />
                    <span>Modéré</span>
                  </button>
                  <button
                    onClick={() => setSelectedRisk(prev => ({ ...prev, severity: 'high' }))}
                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded transition-all duration-200 ${
                      selectedRisk.severity === 'high'
                        ? 'bg-[#bf273a] text-[#ffddb9]'
                        : 'bg-[#ffddb9] text-[#bf273a] border border-[#bf273a]'
                    }`}
                  >
                    <img 
                      src={`/icons/risque-eleve-${selectedRisk.severity === 'high' ? 'FFDDB9' : 'BF273A'}.png`}
                      alt="Risque élevé" 
                      className="w-6 h-6"
                    />
                    <span>Élevé</span>
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-[#0a0304] font-semibold mb-4">Statut du client</p>
                <button
                  onClick={() => setSelectedRisk(prev => ({ ...prev, isRepeat: !prev.isRepeat }))}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded transition-all duration-200 ${
                    selectedRisk.isRepeat
                      ? 'bg-[#bf273a] text-[#ffddb9]'
                      : 'bg-[#ffddb9] text-[#bf273a] border border-[#bf273a]'
                  }`}
                >
                  <img 
                    src={`/icons/recidiviste-${selectedRisk.isRepeat ? 'FFDDB9' : 'BF273A'}.png`}
                    alt="Récidiviste" 
                    className="w-6 h-6"
                  />
                  <span>Récidiviste</span>
                </button>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleApproveWithRisk}
                  className="w-full bg-[#bf273a] text-[#ffddb9] px-6 py-3 rounded hover:scale-105 transition-transform duration-200"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}