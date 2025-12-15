import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'; //Про useLocation загуглил

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '/',
        label: 'Список задач',
    },
    {
        key: '/profile',
        label: 'Профиль',
    }
];


const NavigationMenu: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };

    return <>
        <Menu onClick={onClick} selectedKeys={[currentPath]} mode="vertical" items={items} />
    </>
}

export default NavigationMenu;