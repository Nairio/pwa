import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {FlexBox} from "../../templates/flex";
import {DB} from "../../features/firebase";


export default class Places extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="places"
                    fields={[
                        {id: "name", title: "Название", type: "text"},
                        {id: "description", title: "Описание", type: "text"},
                        {id: "address", title: "Адрес", type: "text"},
                        {id: "phone", title: "Телефон", type: "text"},
                        {id: "contract", title: "Договор", type: "doc"},
                    ]}
                    template={({name, description, address, phone, contract}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <div>
                                <h3>{name}</h3>
                                <p>{description}</p>
                                <p>Адрес: {address}</p>
                                <p>Телефон: {phone}</p>
                                {contract && <p><a onClick={e=>e.stopPropagation()} href={contract} rel="noopener noreferrer" target="_blank">Договор</a></p>}
                                {!contract && <p>Договор</p>}
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
