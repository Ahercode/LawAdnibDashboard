import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
        <SidebarMenuItem to='/setup/app-users' title='Users' fontIcon='bi-layers' icon='element-7' />
        <SidebarMenuItem to='/setup/cases' title='Cases' fontIcon='bi-layers' icon='element-7' />
        <SidebarMenuItem to='/setup/chapters' title='Chapters' fontIcon='bi-layers' icon='element-7' />
        <SidebarMenuItem to='/setup/contents' title='Content' fontIcon='bi-layers' icon='element-7' />
        <SidebarMenuItem to='/setup/user-devices' title='User Devices' fontIcon='bi-layers' icon='element-7' />
    </>
  )
}

export {SidebarMenuMain}
