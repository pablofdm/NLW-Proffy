import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api';

import styles from './styles';

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClasses from '../../assets/images/icons/give-classes.png'
import hearticon from '../../assets/images/icons/heart.png'

function Landing() {
    const { navigate } = useNavigation();
    const [totalConnections, setTotalConnections] = useState(0) 

    useEffect(()=> {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        });
    }, []);

    function handleNavigationToGiveClassesPage(){
       navigate('GiveClasses') 
    }

    function handleNavigateToStudyPages(){
        navigate('Study');
    }

    return ( 
    <View style={styles.container} >
        <Image source={landingImg} style={styles.banner} />
        <Text style={styles.title}>
            Seja bem-vindo, {'\n'}
            <Text style={styles.titlebold}>O que deseja fazer?</Text>
        </Text>
        <View style={styles.buttonsContainer}>
            <RectButton style={[styles.button, styles.buttonPrimary]} onPress={handleNavigateToStudyPages}> 
                <Image source={studyIcon}/>
                <Text style={styles.buttonText}>Estudar</Text>
            </RectButton>
            <RectButton onPress={handleNavigationToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                <Image source={giveClasses}/>
                <Text style={styles.buttonText}>Dar aulas</Text>
            </RectButton>
        </View>
        <Text style={styles.totalConnections}>
            Total de {totalConnections} conexões já realizadas. {' '} <Image source={hearticon}/>
        </Text>
    </View>

    )
}


export default Landing;