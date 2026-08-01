import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WordDefinition {
  DefinitionEn: string
  DefinitionVi: string
  ExampleEn?: string
  ExampleVi?: string
  PartOfSpeech?: string
}

interface FlashcardData {
  Id: string
  Term: string
  Phonetic?: string
  AudioUrl?: string
  word_definitions: WordDefinition[]
}

interface FlashcardUIProps {
  word: FlashcardData
  onRate: (quality: number) => void
}

export default function FlashcardUI({ word, onRate }: FlashcardUIProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [hasFlippedOnce, setHasFlippedOnce] = useState(false)

  // Reset states when the word changes
  useEffect(() => {
    setIsFlipped(false)
    setHasFlippedOnce(false)
  }, [word.Id])

  const definition = word.word_definitions?.[0]

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (word.AudioUrl) {
      const audio = new Audio(word.AudioUrl)
      audio.play()
    } else {
      // Fallback to text-to-speech
      const utterance = new SpeechSynthesisUtterance(word.Term)
      utterance.lang = 'en-US'
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleRate = (quality: number) => {
    setIsFlipped(false)
    setHasFlippedOnce(false)
    // Small delay to allow flip animation to reset smoothly before word change
    setTimeout(() => {
      onRate(quality)
    }, 150)
  }

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped)
    setHasFlippedOnce(true)
  }

  return (
    <div className="perspective-1000 mx-auto flex h-auto min-h-[600px] w-full max-w-2xl flex-col items-center justify-center py-4">
      {/* 3D Flip Container */}
      <div
        className={cn(
          'preserve-3d relative h-[400px] w-full cursor-pointer transition-transform duration-700',
          isFlipped ? 'rotate-y-180' : '',
        )}
        onClick={handleFlipCard}
      >
        {/* Front of Card */}
        <div className="glass-panel absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-3xl border border-white/20 p-6 shadow-2xl transition-colors backface-hidden hover:border-blue-300/50 md:p-8">
          <span className="mb-4 text-sm font-medium tracking-widest text-blue-500/80 uppercase">
            Nhấn để lật thẻ
          </span>
          <h2 className="mb-4 max-w-full px-2 text-center text-5xl font-bold break-words text-gray-800 drop-shadow-sm md:text-7xl ">
            {word.Term}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 shrink-0 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
            onClick={handlePlayAudio}
          >
            <Volume2 size={24} />
          </Button>
        </div>

        {/* Back of Card */}
        <div className="glass-panel custom-scrollbar absolute inset-0 flex h-full w-full rotate-y-180 flex-col items-center justify-center overflow-y-auto rounded-3xl border border-white/20 bg-white/60 p-6 shadow-2xl backface-hidden md:p-8 ">
          <div className="flex w-full flex-col items-center space-y-4 text-center">
            <div>
              <h2 className="mb-2 text-4xl font-bold text-gray-800 ">{word.Term}</h2>
              <div className="flex items-center justify-center gap-3 text-gray-500">
                {word.Phonetic && <span className="font-mono text-lg">/{word.Phonetic}/</span>}
                {definition?.PartOfSpeech && (
                  <span className="rounded-md bg-gray-200 px-2 py-1 text-sm italic ">
                    {definition.PartOfSpeech}
                  </span>
                )}
                <button
                  onClick={handlePlayAudio}
                  className="text-blue-500 transition hover:text-blue-700"
                >
                  <Volume2 size={20} />
                </button>
              </div>
            </div>

            <div className="my-4 h-1 w-16 rounded-full bg-blue-500/30" />

            <div className="w-full">
              <h3 className="mb-2 text-2xl font-semibold text-blue-600 ">
                {definition?.DefinitionVi || 'Chưa có nghĩa tiếng Việt'}
              </h3>
              {definition?.DefinitionEn && (
                <p className="mb-4 text-gray-600 italic ">
                  "{definition.DefinitionEn}"
                </p>
              )}
            </div>

            {definition?.ExampleEn && (
              <div className="mt-4 w-full rounded-2xl bg-blue-50/50 p-4 text-left ">
                <p className="font-medium text-gray-800 ">
                  {definition.ExampleEn}
                </p>
                {definition.ExampleVi && (
                  <p className="mt-1 text-sm text-gray-500">{definition.ExampleVi}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SM-2 Rating Buttons - Only visible after first flip */}
      <div
        className={cn(
          'mt-10 w-full transform transition-all duration-500',
          hasFlippedOnce ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0',
        )}
      >
        <p className="mb-4 text-center text-sm font-medium tracking-widest text-gray-500 uppercase">
          Bạn nhớ từ này ở mức độ nào?
        </p>
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          <Button
            className="h-14 rounded-2xl border-none bg-red-100 text-sm font-bold text-red-700 shadow-sm transition-transform hover:scale-105 hover:bg-red-200 sm:text-base md:text-lg"
            onClick={() => handleRate(0)}
          >
            Quên sạch
          </Button>
          <Button
            className="h-14 rounded-2xl border-none bg-orange-100 text-sm font-bold text-orange-700 shadow-sm transition-transform hover:scale-105 hover:bg-orange-200 sm:text-base md:text-lg"
            onClick={() => handleRate(2)}
          >
            Nhớ mang máng
          </Button>
          <Button
            className="h-14 rounded-2xl border-none bg-blue-100 text-sm font-bold text-blue-700 shadow-sm transition-transform hover:scale-105 hover:bg-blue-200 sm:text-base md:text-lg"
            onClick={() => handleRate(3)}
          >
            Nhớ ổn
          </Button>
          <Button
            className="h-14 rounded-2xl border-none bg-green-100 text-sm font-bold text-green-700 shadow-sm transition-transform hover:scale-105 hover:bg-green-200 sm:text-base md:text-lg"
            onClick={() => handleRate(5)}
          >
            Rất thuộc
          </Button>
        </div>
      </div>
    </div>
  )
}
