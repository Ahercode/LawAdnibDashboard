import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
        <SidebarMenuItem to='/setup/staffs' title='Staffs' fontIcon='bi-layers' icon='element-6' />
        <SidebarMenuItem to='/setup/attendance' title='Staff Attendance' fontIcon='bi-layers' icon='element-6' />
    </>
  )
}

export {SidebarMenuMain}
