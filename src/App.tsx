import { ConfigProvider, Tabs, type TabsProps } from 'antd'
import './App.css'
import { MainPage } from './pages/MainPage'
import { SettingsPage } from './pages/SettingsPage'

function App() {

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Current month',
      children: <MainPage />
    },
    {
      key: '2',
      label: 'Settings',
      children: <SettingsPage />
      
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
