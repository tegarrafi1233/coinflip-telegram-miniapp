import React from 'react'
import { useGame } from '../context/GameContext'
import { CheckCircle, Circle, Clock, Star, Gift } from 'lucide-react'

const Tasks: React.FC = () => {
  const { state, completeTask } = useGame()
  const { tasks, user } = state

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId)
  }

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Clock size={16} className="text-blue-500" />
      case 'weekly':
        return <Star size={16} className="text-yellow-500" />
      case 'achievement':
        return <Gift size={16} className="text-purple-500" />
      default:
        return <Circle size={16} className="text-gray-500" />
    }
  }

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'daily':
        return 'border-blue-500 bg-blue-50'
      case 'weekly':
        return 'border-yellow-500 bg-yellow-50'
      case 'achievement':
        return 'border-purple-500 bg-purple-50'
      default:
        return 'border-gray-300 bg-gray-50'
    }
  }

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">📋 Daily Tasks</h1>
        <p className="text-white/80">Complete tasks to earn bonus points!</p>
      </div>

      {/* Progress Summary */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Progress</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-ton-green">{completedTasks}/{totalTasks}</div>
            <div className="text-sm text-white/70">tasks completed</div>
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-ton-green to-ton-blue h-3 rounded-full transition-all duration-300"
            style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
          />
        </div>
        
        <div className="text-sm text-white/70">
          {completedTasks === totalTasks 
            ? '🎉 All tasks completed! Great job!' 
            : `${totalTasks - completedTasks} tasks remaining`
          }
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 ${
              task.completed ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`p-2 rounded-lg ${getTaskTypeColor(task.type)}`}>
                  {getTaskTypeIcon(task.type)}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${
                    task.completed ? 'text-white/60 line-through' : 'text-white'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-white/70 text-sm">{task.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold text-ton-green">+{task.points}</div>
                <div className="text-xs text-white/60">points</div>
              </div>
            </div>

            {/* Progress Bar for Tasks with Progress */}
            {task.maxProgress > 1 && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-white/70 mb-1">
                  <span>Progress</span>
                  <span>{task.progress}/{task.maxProgress}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-ton-green to-ton-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(task.progress / task.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={() => handleCompleteTask(task.id)}
              disabled={task.completed || task.progress < task.maxProgress}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                task.completed
                  ? 'bg-green-500/50 text-white/50 cursor-not-allowed'
                  : task.progress < task.maxProgress
                  ? 'bg-gray-500/50 text-white/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-ton-blue to-ton-green text-white hover:scale-105 active:scale-95'
              }`}
            >
              {task.completed ? (
                <>
                  <CheckCircle size={20} />
                  <span>Completed</span>
                </>
              ) : task.progress < task.maxProgress ? (
                <>
                  <Clock size={20} />
                  <span>In Progress</span>
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  <span>Complete Task</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Rewards Info */}
      <div className="bg-gradient-to-r from-game-purple to-game-pink rounded-xl p-4 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Gift size={20} />
          <span className="font-semibold">Task Rewards</span>
        </div>
        <ul className="text-sm space-y-1 text-white/90">
          <li>• Daily tasks reset every 24 hours</li>
          <li>• Weekly tasks reset every 7 days</li>
          <li>• Achievement tasks are permanent</li>
          <li>• Complete all daily tasks for bonus rewards</li>
        </ul>
      </div>

      {/* Quick Stats */}
      {user && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Your Task Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{user.tasksCompleted}</div>
              <div className="text-sm text-white/70">Total Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ton-green">{user.points}</div>
              <div className="text-sm text-white/70">Points Earned</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tasks 