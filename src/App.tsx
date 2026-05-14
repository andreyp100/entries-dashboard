import { ConfigProvider, Tabs, type TabsProps } from 'antd'
import './App.css'
import { MainPage } from './pages/MainPage'
import { SettingsPage } from './pages/SettingsPage'
import { DashboardPage } from './pages/DashboardPage'

function App() {

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Текущий месяц',
      children: <MainPage />
    },
    {
      key: '2',
      label: 'Настройки',
      children: <SettingsPage />
    },
    {
      key: '3',
      label: 'Графики',
      children: <DashboardPage />
    }

  ]

  return (
    <ConfigProvider
          theme={{
            components: {
              Tabs: {
                colorPrimary: "#13c2c2",
                itemColor: "#8c8c8c",
                 itemHoverColor: "#6ca1a1ff"
              }
            }
          }}
          >
        < Tabs defaultActiveKey="1" items={tabItems} />
      </ConfigProvider>

  )
  
          
}

export default App
