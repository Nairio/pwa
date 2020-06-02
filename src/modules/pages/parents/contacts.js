import React from 'react';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";

export default class Contacts extends React.Component {
     render() {
        return (
            <DBVirtualList
                single={false}
                dbpath="teacher.contacts"
                fields={[
                    {
                        id: "role", title: "Роль", type: "select", options: [
                            {label: "Мама", value: "Мама"},
                            {label: "Папа", value: "Папа"},
                            {label: "Няня / опекун", value: "Няня / опекун"},
                            {label: "Бабушка", value: "Бабушка"},
                            {label: "Дедушка", value: "Дедушка"},
                            {label: "Брат", value: "Брат"},
                            {label: "Сестра", value: "Сестра"},
                            {label: "Тётя", value: "Тётя"},
                            {label: "Дядя", value: "Дядя"},
                        ]
                    },
                    {id: "photo", title: "Фотография", type: "image"},
                    {id: "firstname", title: "Имя", type: "text"},
                    {id: "lastname", title: "Фамилия", type: "text"},
                    {id: "patronymic", title: "Отчество", type: "text"},
                    {id: "phone", title: "Телефон", type: "text"},
                    {id: "address", title: "Адрес проживания", type: "text"},
                ]}
                template={(item, onEdit) => (
                    <ListItem button alignItems="flex-start" onClick={onEdit}>
                        {item.photo && <ListItemAvatar><Avatar src={item.photo}/></ListItemAvatar>}
                        <div>
                            <p>{item.role}: {item.lastname} {item.firstname} {item.patronymic} ({item.phone}, {item.address})</p>
                        </div>
                    </ListItem>
                )}
            />
        )
    }
}
