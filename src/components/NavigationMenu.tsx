import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

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

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };

    return <>
        <Menu onClick={onClick} defaultSelectedKeys={['/']} mode="vertical" items={items} />
    </>
}

export default NavigationMenu;