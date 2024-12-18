import { create } from 'zustand'
import { api } from '../lib/axios'

interface Course {
	id: number
	modules: Array<{
		id: string
		title: string
		lessons: Array<{
			id: string
			title: string
			duration: string
		}>
	}>
}

export interface PlayerState {
	course: Course | null
	currentLessonIndex: number
	currentModuleIndex: number
	isLoading: boolean

	load: () => Promise<void>
	play: (moduleAndLessonIndex: [number, number]) => void
	next: () => void
}

export const useStore = create<PlayerState>((set, get) => {
	return {
		course: null,
		currentLessonIndex: 0,
		currentModuleIndex: 0,
		isLoading: true,

		load: async () => {
			set({
				isLoading: true,
			})

			const response = await api.get('/courses/1')

			set({
				course: response.data,
				isLoading: false,
			})
		},

		play: (moduleAndLessonIndex: [number, number]) => {
			const [moduleIndex, lessonIndex] = moduleAndLessonIndex

			set({
				currentLessonIndex: lessonIndex,
				currentModuleIndex: moduleIndex,
			})
		},

		next: () => {
			const { currentLessonIndex, currentModuleIndex, course } = get()
			const nextLessonIndex = currentLessonIndex + 1
			const nextLesson =
				course?.modules[currentModuleIndex].lessons[nextLessonIndex]

			if (nextLesson) {
				set({
					currentLessonIndex: nextLessonIndex,
				})
			} else {
				const nextModuleIndex = currentModuleIndex + 1
				const nextModule = course?.modules[nextModuleIndex]

				if (nextModule) {
					set({
						currentModuleIndex: nextModuleIndex,
						currentLessonIndex: 0,
					})
				}
			}
		},
	}
})

export const useCurrentLesson = () => {
	return useStore((state) => {
		const { currentLessonIndex, currentModuleIndex } = state

		const currentModule = state.course?.modules[currentModuleIndex]

		const currentLesson = currentModule?.lessons[currentLessonIndex]

		return { currentLesson, currentModule }
	})
}
