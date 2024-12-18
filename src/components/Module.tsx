import * as Collapsible from '@radix-ui/react-collapsible'

import { ChevronDown } from 'lucide-react'
import { Lesson } from './Lesson'
import { useStore } from '../zustand-store'

interface ModuleProps {
	amountOfLessons: number
	moduleIndex: number
	title: string
}

export const Module = ({
	amountOfLessons,
	moduleIndex,
	title,
}: ModuleProps) => {
	// const lessons = useAppSelector((state) => {
	// 	return state.player.course?.modules[moduleIndex].lessons
	// })

	// const { currentLessonIndex, currentModuleIndex } = useAppSelector(
	// 	(state) => {
	// 		const { currentLessonIndex, currentModuleIndex } = state.player

	// 		return { currentLessonIndex, currentModuleIndex }
	// 	}
	// )

	// const dispatch = useAppDispatch()

	const { currentLessonIndex, currentModuleIndex, lessons, play } = useStore(
		(store) => {
			return {
				currentLessonIndex: store.currentLessonIndex,
				currentModuleIndex: store.currentModuleIndex,
				lessons: store.course?.modules[moduleIndex].lessons,
				play: store.play,
			}
		}
	)

	return (
		<Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
			<Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
				<div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
					{moduleIndex + 1}
				</div>

				<div className="flex flex-col gap-1 text-left">
					<strong className="text-sm">{title}</strong>
					<span className="text-xs text-zinc-400">
						{amountOfLessons} aulas
					</span>
				</div>

				<ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
			</Collapsible.Trigger>

			<Collapsible.CollapsibleContent>
				<nav className="relative flex flex-col gap-4 p-6">
					{lessons &&
						lessons.map((lesson, lessonIndex) => {
							const isCurrent =
								currentModuleIndex === moduleIndex &&
								currentLessonIndex === lessonIndex

							return (
								<Lesson
									key={lesson.id}
									duration={lesson.duration}
									isCurrent={isCurrent}
									onPlay={() =>
										play([moduleIndex, lessonIndex])
									}
									title={lesson.title}
								/>
							)
						})}
				</nav>
			</Collapsible.CollapsibleContent>
		</Collapsible.Root>
	)
}
