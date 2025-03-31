import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { generateRandomClipPath, generateRandomRotation } from '../utils/paperEffect';
import { Modal } from '../components/Modal';

interface Comment {
  id: string;
  text: string;
  date: string;
}

export function ReportDetail() {
  const { id } = useParams();
  
  // Mock data - would come from API in production
  const report = {
    id: "R2024001",
    gender: "Féminin",
    problemType: ["Violence physique", "Vol"],
    location: "Montréal - Le Plateau-Mont-Royal",
    date: "2024-03-15",
    description: "Le client a été agressif dès son arrivée. Il a exigé des services non convenus et a refusé de payer le tarif établi. La situation s'est rapidement détériorée quand j'ai refusé. Il est devenu violent, m'a poussée et a volé mon sac à main avant de partir. L'incident s'est produit vers 22h dans le secteur nord du Plateau.",
  };

  const [newComment, setNewComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      text: 'J\'ai eu une expérience similaire dans ce secteur. Soyez prudentes.',
      date: '2024-03-18'
    },
    {
      id: 'c2',
      text: 'Merci d\'avoir partagé cette information, ça aide beaucoup la communauté.',
      date: '2024-03-17'
    }
  ]);

  // Generate random effects once when component mounts
  const randomEffects = useMemo(() => ({
    mainCard: {
      clipPath: generateRandomClipPath(),
      rotation: generateRandomRotation()
    },
    tags: report.problemType.map(() => ({
      clipPath: generateRandomClipPath(),
      rotation: generateRandomRotation()
    })),
    submitButton: {
      clipPath: generateRandomClipPath(),
      rotation: generateRandomRotation()
    },
    comments: comments.map(() => ({
      clipPath: generateRandomClipPath(),
      rotation: generateRandomRotation()
    }))
  }), []); // Empty dependency array means this only runs once on mount


  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setShowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Report Card */}
      <div
        className="relative bg-[#bf273a] p-8 text-[#ffddb9]"
        style={{
          clipPath: randomEffects.mainCard.clipPath,
          transform: randomEffects.mainCard.rotation
        }}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold mb-0 text-[#ffddb9]">Signalement #{report.id}</h1>
            <span className="text-sm text-[#ffddb9]">
              {new Date(report.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-[#ffddb9]">Informations</h2>
              <p className="mb-1 text-[#ffddb9]">Genre: {report.gender}</p>
              <p className="mb-1 text-[#ffddb9]">Lieu: {report.location}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-[#ffddb9]">Type d'incident</h2>
              <div className="flex flex-wrap gap-2">
                {report.problemType.map((type, index) => (
                  <span
                    key={type}
                    className="inline-block px-3 py-1 text-sm"
                    style={{
                      background: '#ffddb9',
                      color: '#bf273a',
                      clipPath: randomEffects.tags[index].clipPath,
                      transform: randomEffects.tags[index].rotation
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-[#ffddb9]">Description</h2>
              <p className="text-base leading-relaxed text-[#ffddb9]">{report.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#0a0304]">Commentaires de la communauté</h2>
        
        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="space-y-6">
          <div className="relative" style={{ filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.15))' }}>
            <div 
              className="absolute inset-0 bg-[#bf273a]"
              style={{
                clipPath: randomEffects.mainCard.clipPath,
                transform: randomEffects.mainCard.rotation,
                zIndex: 1
              }}
            ></div>
            <div 
              className="absolute inset-[2px] bg-[#ffddb9]"
              style={{
                clipPath: randomEffects.mainCard.clipPath,
                transform: randomEffects.mainCard.rotation,
                zIndex: 2
              }}
            ></div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Partagez votre expérience ou vos conseils de façon anonyme..."
              className="relative z-10 w-full h-32 p-6 bg-transparent border-none focus:outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            className="relative font-poppins hover:scale-105 transition-transform duration-200 px-6 py-3 text-[#bf273a]"
          >
            <div 
              className="absolute inset-0 bg-[#ffddb9]"
              style={{
                clipPath: randomEffects.submitButton.clipPath,
                transform: randomEffects.submitButton.rotation,
                zIndex: 1
              }}
            ></div>
            <span className="relative z-20 inline-block">
              Publier le commentaire
            </span>
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className="relative bg-[#bf273a] p-6 text-[#ffddb9]"
              style={{
                clipPath: randomEffects.comments[index].clipPath,
                transform: randomEffects.comments[index].rotation
              }}
            >
              <p className="mb-2 text-[#ffddb9]">{comment.text}</p>
              <span className="text-sm opacity-75 text-[#ffddb9]">
                {new Date(comment.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <Modal isOpen={showModal} onClose={() => {
        setShowModal(false);
        setNewComment('');
      }}>
        <div className="text-center">
          <p className="mb-6 text-[#0a0304]">
            Ton commentaire sera affiché dès qu'il aura été validé par l'équipe de modération.
          </p>
          <button
            onClick={() => {
              setShowModal(false);
              setNewComment('');
            }}
            className="bg-[#bf273a] text-[#ffddb9] px-6 py-2 rounded hover:scale-105 transition-transform duration-200"
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
}