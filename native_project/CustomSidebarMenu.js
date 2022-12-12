import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            {/*Top Large Image */}
            <Image
                source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'}}
                style={styles.sideMenuProfileIcon}
            />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
        color: 'red'
    },
});

export default CustomSidebarMenu;
