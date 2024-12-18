import { describe, expect, it } from 'vitest'
import {
	next,
	play,
	playerSlice,
	PlayerState,
	player as reducer,
} from './player'

const exampleState: PlayerState = {
	course: {
		id: 1,
		modules: [
			{
				id: '1',
				title: 'Iniciando com React',
				lessons: [
					{
						id: 'Jai8w6K_GnY',
						title: 'CSS Modules',
						duration: '13:45',
					},
					{
						id: 'w-DW4DhDfcw',
						title: 'Estilização do Post',
						duration: '10:05',
					},
				],
			},
			{
				id: '2',
				title: 'Estrutura da aplicação',
				lessons: [
					{
						id: 'gE48FQXRZ_o',
						title: 'Componente: Comment',
						duration: '13:45',
					},
					{
						id: 'Ng_Vk4tBl0g',
						title: 'Responsividade',
						duration: '10:05',
					},
				],
			},
		],
	},
	currentLessonIndex: 0,
	currentModuleIndex: 0,
	isLoading: false,
}

describe('player slice', () => {
	it('should be able to play', () => {
		const inicialState = playerSlice.getInitialState()

		const state = reducer(inicialState, play([1, 2]))

		expect(state.currentModuleIndex).toBe(1)
		expect(state.currentLessonIndex).toBe(2)
	})

	it('should be able to play next video automatically', () => {
		const state = reducer(exampleState, play([0, 0]))
		const nextState = reducer(state, next())

		expect(nextState.currentModuleIndex).toBe(0)
		expect(nextState.currentLessonIndex).toBe(1)
	})

	it('should be able to play jump to the next module automatically', () => {
		const state = reducer(
			{ ...exampleState, currentLessonIndex: 1 },
			next()
		)

		expect(state.currentModuleIndex).toBe(1)
		expect(state.currentLessonIndex).toBe(0)
	})

	it('should not update the current module and lesson index if there is no next lesson available', () => {
		const state = reducer(
			{ ...exampleState, currentLessonIndex: 1, currentModuleIndex: 1 },
			next()
		)

		expect(state.currentModuleIndex).toBe(1)
		expect(state.currentLessonIndex).toBe(1)
	})
})
