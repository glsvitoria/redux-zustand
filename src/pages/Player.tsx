import { MessageCircle } from 'lucide-react'
import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'
import { useEffect } from 'react'
import { useCurrentLesson, useStore } from '../zustand-store'

export function Player() {
	// const modules = useAppSelector((state) => {
	// 	return state.player.course?.modules
	// })

	// const { currentLesson } = useCurrentLesson()

	// const dispatch = useAppDispatch()

	// useEffect(() => {
	// 	dispatch(loadCourse())
	// }, [dispatch])

	// useEffect(() => {
	// 	if (currentLesson) document.title = `Assistindo: ${currentLesson.title}`
	// }, [currentLesson, currentLesson?.title])

	const { course, load } = useStore((store) => {
		return {
			course: store.course,
			load: store.load,
		}
	})

	const { currentLesson } = useCurrentLesson()

	useEffect(() => {
		load()
	}, [])

	useEffect(() => {
		if (currentLesson) document.title = `Assistindo: ${currentLesson.title}`
	}, [currentLesson, currentLesson?.title])

	return (
		<div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
			<div className="flex w-[1100px] gap-6 flex-col">
				<div className="flex items-center justify-between">
					<Header />

					<button className="flex items-center gap-2 rounded bg-violet-500 px-3 text-sm font-medium text-white hover:bg-violet-600">
						Deixar feedback <MessageCircle className="w-4 h-4" />
					</button>
				</div>

				<main className="relative flex overflow-hidden rounded-lg border border-zinc-600 bg-zinc-900 shadow pr-80">
					<div className="flex-1">
						<Video />
					</div>

					<aside className="absolute top0 bottom-0 w-80 border-l border-zinc-800 bg-zinc-900 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800 divide-y-2 divide-zinc-900">
						{/* {modules &&
							modules.map((module, index) => {
								return (
									<Module
										key={module.id}
										amountOfLessons={module.lessons.length}
										moduleIndex={index}
										title={module.title}
									/>
								)
							})} */}
						{course?.modules &&
							course.modules.map((module, index) => {
								return (
									<Module
										key={module.id}
										amountOfLessons={module.lessons.length}
										moduleIndex={index}
										title={module.title}
									/>
								)
							})}
					</aside>
				</main>
			</div>
		</div>
	)
}
