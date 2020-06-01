import React from 'react';
import './App.css';
import Index from "./modules/pages/index";

import Divider from "@material-ui/core/Divider";
import {SwipeableBottom, SwipeableTop} from "./modules/templates/swipeable";
import {storage} from "./modules/features/localstorage";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Account from "./modules/pages/account/account";
import {Page, PWA, Slide} from "./modules/templates/pwa";
import Change from "./modules/pages/account/change";
import Logout from "./modules/pages/account/logout";
import Login from "./modules/pages/account/login";
import Register from "./modules/pages/account/register";
import Forgot from "./modules/pages/account/forgot";
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
import Contacts from "./modules/pages/parents/contacts";
import Diploms from "./modules/pages/parents/diploms";
import Experience from "./modules/pages/parents/experience";
import Achievements from "./modules/pages/parents/achievements";
import Courses from "./modules/pages/parents/courses";
import Groups from "./modules/pages/parents/groups";
import Students from "./modules/pages/parents/students";
import Calendar from "./modules/pages/calendar/calendar";
import Chat from "./modules/pages/chat/chat";
import Reports from "./modules/pages/reports/reports";
import Hslide from "./modules/pages/parents/hslide";
import Places from "./modules/pages/parents/places";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CategoryIcon from '@material-ui/icons/Category';
import Subjects from "./modules/pages/parents/subjects";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Teachers from "./modules/pages/parents/teachers";
import Levels from "./modules/pages/parents/levels";
import Parents from "./modules/pages/parents/parents";
import ChildCareIcon from '@material-ui/icons/ChildCare';
import HistoryIcon from '@material-ui/icons/History';
import History from "./modules/pages/parents/history";

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
            <PWA appId="pwa" title="Future Simple School" subtitle="Parents">
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

                <Page disabled={!email} title="Контакты" icon={<AccountBoxIcon/>} path="/contacts/" component={Hslide}>
                    <SwipeableBottom>
                        <Page title="Контакты" icon={<AccountBoxIcon/>} component={Contacts}/>
                    </SwipeableBottom>
                </Page>
                <Divider/>
                <Page disabled={!email} title="Курсы" icon={<DvrIcon/>} path="/courses/" component={Courses}/>
                <Page disabled={!email} title="Группы" icon={<GroupIcon/>} path="/groups/" component={Groups}/>
                <Page disabled={!email} title="Студенты" icon={<ChildCareIcon/>} path="/students/" component={Students}/>
                <Page disabled={!email} title="История" icon={<HistoryIcon/>} path="/history/" component={History}/>

                <Divider/>
                <Page disabled={!email} title="Календарь" icon={<DateRangeIcon/>} path="/calendar/" component={Calendar}/>
                <Page disabled={!email} title="Чат" icon={<ChatIcon/>} path="/chat/" component={Chat}/>
                <Divider/>
                <Page disabled={!email} title="Отчёты" icon={<MonetizationOnIcon/>} path="/reports/" component={Reports}/>
            </PWA>
        )
    }
}


export default App;
