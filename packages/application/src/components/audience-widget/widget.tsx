import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Banner, Button, Drawer, Form, Stack } from '@servicetitan/design-system';
import classnames from 'classnames';
import { provide, useDependencies } from '@servicetitan/react-ioc';
import { WidgetStore } from '../../stores/widget.store';
import { observer } from 'mobx-react';
import './widget.css'
import './loader.css'
import * as Styles from './widget.module.less';

// @ts-ignore
const Message = ({ isUser, time, text }) => {
    return (
        <div className={classnames('msg', {
            'right-msg': isUser,
            'left-msg': !isUser
        })}>
            <div className="msg-bubble">
                <div className="msg-info">
                    <div className="msg-info-name">{isUser ? 'Me' : 'Marketing Bot'}</div>
                    <div className="msg-info-time">{time}</div>
                </div>

                <div className="msg-text">
                    {text}
                </div>
            </div>
        </div>
    )
}

const Footer = observer(() => {
    const [widgetStore] = useDependencies(WidgetStore);

    return (
        <Stack className="w-100" direction='row' alignItems="center" alignContent="center">
            <Form className="d-f w-100" onSubmit={widgetStore.handleInputSubmit}>
                <Form.Input error={widgetStore.userInputText.length > 121} value={widgetStore.userInputText} onChange={widgetStore.handleInputChange} className="m-b-0 w-100 m-r-2" placeholder="Leia" />
                <Button type="submit" primary iconName="send" loading={widgetStore.loading} disabled={widgetStore.userInputText.length < 3}/>
            </Form>
        </Stack>
    )
})


export const Widget = provide({
    singletons: [WidgetStore]
})(observer(() => {
    const chatRef = useRef<any>();
    const [widgetStore] = useDependencies(WidgetStore)

    useEffect(() => {
        // @ts-ignore
        chatRef.current?.scrollTop += 500;
    }, [widgetStore.messages.length])

    return (
        <div>
            <button onClick={widgetStore.setDrawerOpen}>Open</button>
            <Drawer
                className={Styles.drawerRoot}
                header="Drawer Header"
                footer={<Footer />}
                open={widgetStore.open}
                onClose={widgetStore.setDrawerClose}
                backdrop
            >
                <section className="msger">
                    <main ref={chatRef} className="msger-chat">
                        {widgetStore.messages.map(message => {
                            // @ts-ignore
                            return <Message isUser={message.isUser} text={message.message} time={message.time} />
                        })}
                        {widgetStore.loading && (
                            <div className={classnames('msg', 'left-msg')}>
                                <div className="msg-bubble">
                                    <div className="loader"></div>
                                </div>
                            </div>
                        )}

                    </main>
                    {widgetStore.userInputText.length > 121 &&
                        <Banner
                            className={Styles.bannerRoot}
                            status="critical"
                            icon
                            title=""
                        >
                            The message you submitted was too long, please reload the conversation and submit something shorter.
                        </Banner>
                    }
                </section>
            </Drawer>
        </div>
    );
}));

export default Widget;
