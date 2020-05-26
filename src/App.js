import React from 'react';
import './App.css';
import Index from "./modules/pages/index";

import VirtualListPage from "./modules/pages/virtual-list/virtual-list";
import Divider from "@material-ui/core/Divider";
import {SwipeableBottom, SwipeableTop} from "./modules/templates/swipeable";
import {storage} from "./modules/features/localstorage";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Account from "./modules/pages/account/account";
import {Page, PWA, Slide} from "./modules/templates/pwa";
import Hslide from "./modules/pages/slides/hslide";
import Change from "./modules/pages/account/change";
import Logout from "./modules/pages/account/logout";
import Login from "./modules/pages/account/login";
import Register from "./modules/pages/account/register";
import Forgot from "./modules/pages/account/forgot";
import FormPage from "./modules/pages/form/form";
import ChatIcon from '@material-ui/icons/Chat';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';
import DvrIcon from '@material-ui/icons/Dvr';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PublicIcon from '@material-ui/icons/Public';
import GroupIcon from '@material-ui/icons/Group';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Contact from "./modules/pages/teacher/contact";
import Diploms from "./modules/pages/teacher/diploms";
import Experience from "./modules/pages/teacher/experience";
import Achievements from "./modules/pages/teacher/achievements";

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        const {name, email} = storage("auth") || {};
        this.state = {name, email};
        this.onAccountChange = this.onAccountChange.bind(this);
    }

    onAccountChange({name, email}) {
        this.setState({name, email});
    }

    render() {
        const {name, email} = this.state;

        return (
            <PWA appId="pwa" title="Future Simple School" subtitle="Teacher">
                <Page title="Главная" path="/" component={Index}/>

                <Page disabled={email} title={"Вход"} icon={<LockOpenIcon/>} path="/account/" onChange={this.onAccountChange} component={Account}>
                    <SwipeableTop>
                        <Slide title="Войти" component={Login}/>
                        <Slide title="Зарегистрироваться" component={Register}/>
                        <Slide title="Восстановить пароль" component={Forgot}/>
                    </SwipeableTop>
                </Page>

                <Page disabled={!email} title={`${name} (${email})`} icon={<LockIcon/>} path="/account/" onChange={this.onAccountChange} component={Account}>
                    <SwipeableTop>
                        <Slide auth={{name, email}} title="Выйти" component={Logout}/>
                        <Slide auth={{name, email}} title="Сменить пароль" component={Change}/>
                    </SwipeableTop>
                </Page>

                <Divider/>
                <Page disabled={!email} title="Личные данные" icon={<AccountBoxIcon/>} path="/personal/" component={Hslide}>
                    <SwipeableBottom>
                        <Page title="Контакты" icon={<AccountBoxIcon/>} component={Contact}/>
                        <Page title="Дипломы" icon={<VerifiedUserIcon/>} component={Diploms}/>
                        <Page title="Опыт" icon={<BusinessCenterIcon/>} component={Experience}/>
                        <Page title="Достижения" icon={<PublicIcon/>} component={Achievements}/>
                    </SwipeableBottom>
                </Page>
                <Divider/>

                <Page disabled={!email} title="Курсы" icon={<DvrIcon/>} path="/courses/" component={VirtualListPage}/>
                <Page disabled={!email} title="Группы" icon={<GroupIcon/>} path="/courses/" component={VirtualListPage}/>
                <Page disabled={!email} title="Студенты" icon={<AccessibilityNewIcon/>} path="/students/" component={VirtualListPage}/>
                <Divider/>

                <Page disabled={!email} title="Календарь" icon={<DateRangeIcon/>} path="/calendar/" component={FormPage}/>
                <Page disabled={!email} title="Чат" icon={<ChatIcon/>} path="/calendar/" component={VirtualListPage}/>
                <Divider/>
                <Page disabled={!email} title="Отчёты" icon={<MonetizationOnIcon/>} path="/calendar/" component={VirtualListPage}/>
            </PWA>
        )
    }
}


export default App;
