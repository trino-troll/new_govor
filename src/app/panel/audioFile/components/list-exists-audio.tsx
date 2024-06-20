import { AudiofilesType } from '@/app/shared/_model/interface'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { deleteAudioFiles } from '../action/delete-audio-files'

type Props = {
  audiofiles: AudiofilesType[]
}

const ListExistsAudio = ({ audiofiles }: Props) => {
  const router = useRouter()

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteAudioFiles(id)
      if (res) {
        toast.success(`Запись ${res.name} удалена`)
      }
    } catch (error) {
      toast.error('Не удалось удалить аудиозапись, клиент')
    }
  }

  return (
    <>
      <div className="text-center mt-4">
        <div className="grid grid-cols-2 gap-2 px-4">
          {audiofiles
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((audio: AudiofilesType, i: number) => (
              <div
                key={audio.id}
                className="bg-[#1A202C] text-white rounded-md relative"
              >
                {audio.name}
                <button
                  className="absolute right-1 top-1"
                  onClick={() => handleDelete(audio.id)}
                >
                  <X size={16} color={'#f57900'} />
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
export default ListExistsAudio
