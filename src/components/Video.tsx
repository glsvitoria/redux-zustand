import ReactPlayer from 'react-player'
import { Loader } from 'lucide-react'
import { useCurrentLesson, useStore } from '../zustand-store'

export const Video = () => {
	// const dispatch = useAppDispatch()

	// const { currentLesson } = useCurrentLesson()

	// const isCourseLoading = useAppSelector((state) => state.player.isLoading)

	// const handlePlayNext = () => {
	// 	dispatch(next())
	// }

	const { currentLesson } = useCurrentLesson()

	const { isLoading, next } = useStore((store) => {
		return {
			isLoading: store.isLoading,
			next: store.next,
		}
	})

	const handlePlayNext = () => {
		next()
	}

	return (
		<div className="bg-zinc-950 aspect-video">
			{isLoading ? (
				<div className="flex h-full items-center justify-center">
					<Loader className="w-6 h-6 text-zinc-400 animate-spin" />
				</div>
			) : (
				<ReactPlayer
					width="100%"
					height="100%"
					controls
					onEnded={handlePlayNext}
					playing
					url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
				/>
			)}
		</div>
	)
}
