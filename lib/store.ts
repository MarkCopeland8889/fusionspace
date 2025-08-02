import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project, ProjectCheckpoint } from './supabase'

interface AIState {
  isGenerating: boolean
  currentRequest: string | null
  lastResponse: any | null
  error: string | null
  tokensUsed: number
  cost: number
}

interface ProjectState {
  currentProject: Project | null
  projects: Project[]
  checkpoints: ProjectCheckpoint[]
  isLoading: boolean
  error: string | null
}

interface EditorState {
  activeFile: string | null
  fileContent: Record<string, string>
  isEditing: boolean
  hasUnsavedChanges: boolean
  activeTab: 'preview' | 'code' | 'terminal'
  showFileViewer: boolean
}

interface ChatState {
  messages: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    type?: 'code' | 'text' | 'error'
  }>
  isTyping: boolean
}

interface UserState {
  credits: {
    daily: number
    monthly: number
    dailyLimit: number
    monthlyLimit: number
  }
  plan: 'free' | 'plus' | 'pro' | 'enterprise'
}

interface FusionSpaceStore {
  // AI State
  ai: AIState
  setGenerating: (generating: boolean) => void
  setCurrentRequest: (request: string | null) => void
  setLastResponse: (response: any) => void
  setAIError: (error: string | null) => void
  addTokensUsed: (tokens: number) => void
  addCost: (cost: number) => void
  resetAI: () => void

  // Project State
  projects: ProjectState
  setCurrentProject: (project: Project | null) => void
  setProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  setProjectLoading: (loading: boolean) => void
  setProjectError: (error: string | null) => void
  addCheckpoint: (checkpoint: ProjectCheckpoint) => void
  setCheckpoints: (checkpoints: ProjectCheckpoint[]) => void

  // Editor State
  editor: EditorState
  setActiveFile: (file: string | null) => void
  setFileContent: (file: string, content: string) => void
  setEditing: (editing: boolean) => void
  setUnsavedChanges: (hasChanges: boolean) => void
  setActiveTab: (tab: 'preview' | 'code' | 'terminal') => void
  setShowFileViewer: (show: boolean) => void
  resetEditor: () => void

  // Chat State
  chat: ChatState
  addMessage: (message: Omit<ChatState['messages'][0], 'id' | 'timestamp'>) => void
  setTyping: (typing: boolean) => void
  clearChat: () => void

  // User State
  user: UserState
  setCredits: (credits: UserState['credits']) => void
  setPlan: (plan: UserState['plan']) => void
  useCredits: (amount: number) => void
}

const initialAIState: AIState = {
  isGenerating: false,
  currentRequest: null,
  lastResponse: null,
  error: null,
  tokensUsed: 0,
  cost: 0,
}

const initialProjectState: ProjectState = {
  currentProject: null,
  projects: [],
  checkpoints: [],
  isLoading: false,
  error: null,
}

const initialEditorState: EditorState = {
  activeFile: null,
  fileContent: {},
  isEditing: false,
  hasUnsavedChanges: false,
  activeTab: 'preview',
  showFileViewer: true,
}

const initialChatState: ChatState = {
  messages: [],
  isTyping: false,
}

const initialUserState: UserState = {
  credits: {
    daily: 0,
    monthly: 0,
    dailyLimit: 10,
    monthlyLimit: 50,
  },
  plan: 'free',
}

export const useFusionSpaceStore = create<FusionSpaceStore>()(
  persist(
    (set, get) => ({
      // AI State
      ai: initialAIState,
      setGenerating: (generating) =>
        set((state) => ({
          ai: { ...state.ai, isGenerating: generating },
        })),
      setCurrentRequest: (request) =>
        set((state) => ({
          ai: { ...state.ai, currentRequest: request },
        })),
      setLastResponse: (response) =>
        set((state) => ({
          ai: { ...state.ai, lastResponse: response },
        })),
      setAIError: (error) =>
        set((state) => ({
          ai: { ...state.ai, error },
        })),
      addTokensUsed: (tokens) =>
        set((state) => ({
          ai: { ...state.ai, tokensUsed: state.ai.tokensUsed + tokens },
        })),
      addCost: (cost) =>
        set((state) => ({
          ai: { ...state.ai, cost: state.ai.cost + cost },
        })),
      resetAI: () =>
        set((state) => ({
          ai: initialAIState,
        })),

      // Project State
      projects: initialProjectState,
      setCurrentProject: (project) =>
        set((state) => ({
          projects: { ...state.projects, currentProject: project },
        })),
      setProjects: (projects) =>
        set((state) => ({
          projects: { ...state.projects, projects },
        })),
      addProject: (project) =>
        set((state) => ({
          projects: {
            ...state.projects,
            projects: [...state.projects.projects, project],
          },
        })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: {
            ...state.projects,
            projects: state.projects.projects.map((p) =>
              p.id === id ? { ...p, ...updates } : p
            ),
            currentProject:
              state.projects.currentProject?.id === id
                ? { ...state.projects.currentProject, ...updates }
                : state.projects.currentProject,
          },
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: {
            ...state.projects,
            projects: state.projects.projects.filter((p) => p.id !== id),
            currentProject:
              state.projects.currentProject?.id === id
                ? null
                : state.projects.currentProject,
          },
        })),
      setProjectLoading: (loading) =>
        set((state) => ({
          projects: { ...state.projects, isLoading: loading },
        })),
      setProjectError: (error) =>
        set((state) => ({
          projects: { ...state.projects, error },
        })),
      addCheckpoint: (checkpoint) =>
        set((state) => ({
          projects: {
            ...state.projects,
            checkpoints: [...state.projects.checkpoints, checkpoint],
          },
        })),
      setCheckpoints: (checkpoints) =>
        set((state) => ({
          projects: { ...state.projects, checkpoints },
        })),

      // Editor State
      editor: initialEditorState,
      setActiveFile: (file) =>
        set((state) => ({
          editor: { ...state.editor, activeFile: file },
        })),
      setFileContent: (file, content) =>
        set((state) => ({
          editor: {
            ...state.editor,
            fileContent: { ...state.editor.fileContent, [file]: content },
            hasUnsavedChanges: true,
          },
        })),
      setEditing: (editing) =>
        set((state) => ({
          editor: { ...state.editor, isEditing: editing },
        })),
      setUnsavedChanges: (hasChanges) =>
        set((state) => ({
          editor: { ...state.editor, hasUnsavedChanges: hasChanges },
        })),
      setActiveTab: (tab) =>
        set((state) => ({
          editor: { ...state.editor, activeTab: tab },
        })),
      setShowFileViewer: (show) =>
        set((state) => ({
          editor: { ...state.editor, showFileViewer: show },
        })),
      resetEditor: () =>
        set((state) => ({
          editor: initialEditorState,
        })),

      // Chat State
      chat: initialChatState,
      addMessage: (message) =>
        set((state) => ({
          chat: {
            ...state.chat,
            messages: [
              ...state.chat.messages,
              {
                ...message,
                id: Date.now().toString(),
                timestamp: new Date(),
              },
            ],
          },
        })),
      setTyping: (typing) =>
        set((state) => ({
          chat: { ...state.chat, isTyping: typing },
        })),
      clearChat: () =>
        set((state) => ({
          chat: initialChatState,
        })),

      // User State
      user: initialUserState,
      setCredits: (credits) =>
        set((state) => ({
          user: { ...state.user, credits },
        })),
      setPlan: (plan) =>
        set((state) => ({
          user: { ...state.user, plan },
        })),
      useCredits: (amount) =>
        set((state) => ({
          user: {
            ...state.user,
            credits: {
              ...state.user.credits,
              daily: Math.min(
                state.user.credits.daily + amount,
                state.user.credits.dailyLimit
              ),
              monthly: Math.min(
                state.user.credits.monthly + amount,
                state.user.credits.monthlyLimit
              ),
            },
          },
        })),
    }),
    {
      name: 'fusionspace-store',
      partialize: (state) => ({
        projects: state.projects,
        editor: state.editor,
        chat: state.chat,
        user: state.user,
      }),
    }
  )
) 