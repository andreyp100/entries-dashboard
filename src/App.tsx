import { ConfigProvider, Tabs, type TabsProps } from 'antd'
import './App.css'
import { MainPage } from './pages/MainPage'
import { SettingsPage } from './pages/SettingsPage'

function App() {

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'MainPage',
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
                itemColor: "#8c8c8c"
              }
            }
          }}
          >
        < Tabs defaultActiveKey="1" items={tabItems} />
      </ConfigProvider>

  )
  
          
}

export default App
