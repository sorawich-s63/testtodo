// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text, 
    View,
    TextInput,
    Pressable,
    Image,
    ScrollView,
    Alert,
    Platform,
} from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';
import TodoDataService from "../services/todo.service";

export default function Edit( { route,navigation } ) {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateText, setdateText] = useState("EMPTY");
    const [timeText, settimeText] = useState("EMPTY");

    const [title,setTitle] = useState("");
    const [des,setDes] = useState("");
    
    const data = route.params.item;
    const datearray = data.datetime.split("-");
    React.useEffect(() => {
        if (route.params?.item) {
            setTitle(data.title);
            setDes(data.description);
            
            setdateText(datearray[0]);
            settimeText(datearray[1]);
        }
    }, [route.params?.Todo]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)

        const formatTime = (hours,minute) => {

            if (minute < 10){
                let Time = hours + ':' + '0' + minute;
                return Time
            }else {
                let Time =  hours + ':' + minute;
                return Time
            }

        };  

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = formatTime(tempDate.getHours(), tempDate.getMinutes())

        setdateText(fDate)
        settimeText(fTime)

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const handleback = () => {
        navigation.goBack()
    };

    const handleSave = () => {
        const datenew = dateText+"-"+timeText
        const dataNew = {
            title : title,
            description : des,
            datetime : datenew,
            published : data.published,
            favourite : data.favourite,
        };
        navigation.navigate({
                    name: 'Home',
                })
        TodoDataService.update(data.id,dataNew)
        .then(response => {
            navigation.navigate({
                name: 'Home',
            })
        })
        .catch(e => {
            console.log(e);
        });
        
    };
    const handleDelete = () => {
        TodoDataService.delete(data.id)
        .then(response => {
            navigation.navigate({
                name: 'Home',
            })
        })
        .catch(e => {
            console.log(e);
        });
    };
    
    return (
        <View style={styles.container}>
            {/* ส่วนหัว */}
            <View style={styles.Header_Footer}>
                <Text style={styles.Header_Title}>Todo-List</Text>
                <Pressable style={styles.Back_icon} onPress={() => handleback()}>
                    <Image source={require('../image/back_icon.png')} style={styles.Icon_size}> 
                    </Image>
                </Pressable>
            </View>

            {/* ส่วนโค้งสีขาวข้างใต้ search_title  */}
            <View style={styles.Header}></View>
            
            
            <View style={styles.Body_footer}>

                {/* เลื่อนขึ้นเลื่อนลงได้เมื่อเกินหน้าจอ   */}
                <ScrollView style={styles.Scrollview_size}>

                    <Text style={styles.Text_size}>Title name:</Text>
                    
                    <View style={styles.Name_square}>
                        <TextInput 
                            style={styles.Name_input} 
                            placeholder='Enter the name'
                            value = {title}
                            onChangeText = {(text) => setTitle(text)}
                        />
                    </View>

                    <Text style={styles.Text_size}>Detail:</Text>
                    <View style={styles.Detail_square}>
                        <TextInput 
                            style={styles.Detail_input} 
                            multiline={true} 
                            editable={true} 
                            placeholder='Note something?'
                            value = {des}
                            onChangeText = {(text) => setDes(text)}
                        />
                    </View>

                    <View style={styles.Datetime_footer} >
                        <Text style={styles.Text_size}>Date:</Text>
                        <View style={styles.Date_square}>
                            <Pressable style={styles.Date_icon} onPress={() => showMode('date')}>
                                <Text style={styles.Date_size}>{dateText}</Text>
                            </Pressable>
                        </View>

                        <Text style={styles.Text_size}>Time:</Text>
                        <View style={styles.Time_square}>
                            <Pressable style={styles.Time_icon} onPress={() => showMode('time')}>
                                <Text style={styles.Time_size}>{timeText}</Text>
                            </Pressable>
                        </View>

                        {show && (
                            <DateTimePicker
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='default'
                            onChange={onChange}
                            />)}

                    </View>

                </ScrollView>
                
                <View style={styles.BT_footer}>
                    <View style={styles.SaveBT_footer}>
                        <Pressable style={styles.Save_icon} onPress={() => handleSave()}>
                            <Text style={styles.Save_text}>SAVE</Text>
                        </Pressable>
                    </View>
                    <View style={styles.DeleteBT_footer}>
                        <Pressable style={styles.Delete_icon} onPress={() => handleDelete()}>
                            <Text style={styles.Delete_text}>DELETE</Text>
                        </Pressable>
                    </View>
                </View>

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    Header_Footer: {
        position: "absolute",
        width: 415,
        height: 154,
        left: 0,
        top: 0,
        backgroundColor: "#3DA9FC",
    },
    Header_Title: {
        position: "absolute",
        width: 117,
        height: 28,
        left: 150,
        top: 40,
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 24,
        lineHeight: 28,
        textAlign: "center",
        color: "#FFFFFF",
    },
    Header: {
        position: "absolute",
        width: 412,
        height: 26,
        top: 89,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
    },
    Body_footer: {
        position: "absolute",
        width: 412,
        height: 530,
        top: 115,
        backgroundColor: "#FFFFFF",
    },
    Back_icon:{
        position: 'absolute',
        width: 60,
        height: 50,
        left: 0,
        top: 30,
        //backgroundColor: '#FFFFFF'
    },
    Icon_size:{
        width: 60,
        height: 60,
    },
    Scrollview_size:{
        position: "relative",
        width: 395,
        height: 470,
        left: 8,
        borderRadius: 20,
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#FFFFFF",
    },
    Text_size:{
        // fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 24,
        lineHeight: 28,
        color: '#094067',
        marginBottom: 10,
    },
    Name_square:{
        position: 'relative',
        width: 360,
        height: 40,
        backgroundColor: `#e6e6fa`,
        borderWidth: 2,
        borderColor: '#094067',
        borderRadius: 5,
        marginBottom: 30,
    },
    Name_input:{
        position: "absolute",
        width: 330,
        height: 40,
        left: 10,
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 16,
    },
    Detail_square:{
        position: 'relative',
        width: 360,
        height: 170,
        backgroundColor: `#e6e6fa`,
        borderWidth: 2,
        borderColor: '#094067',
        borderRadius: 5,
        marginBottom: 30,
    },
    Detail_input:{
        position: "relative",
        width: 330,
        height: 400,
        top: 5,
        left: 10,
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 25,
        paddingTop: 0,
        paddingBottom: 0,
        textAlignVertical: 'top',
    },
    Date_size:{
        position: "absolute",
        width: 330,
        height: 28,
        left: 10,
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 25,
    },
    Date_square:{
        position: 'relative',
        width: 120,
        height: 30,
        backgroundColor: `#e6e6fa`,
        borderWidth: 2,
        borderColor: '#094067',
        borderRadius: 5,
        marginBottom: 30,
    },
    Date_icon:{
        position: 'absolute',
        width: 150,
        height: 30,
        // backgroundColor: '#FFFFFF'
    },
    Time_square:{
        position: 'relative',
        width: 70,
        height: 30,
        backgroundColor: `#e6e6fa`,
        borderWidth: 2,
        borderColor: '#094067',
        borderRadius: 5,
        marginBottom: 30,
    },
    Time_icon:{
        position: 'absolute',
        width: 160,
        height: 30,
        // backgroundColor: '#FFFFFF'
    },
    Time_size:{
        position: "absolute",
        width: 330,
        height: 28,
        left: 10,
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 25,
    },
    Datetime_footer:{
        position: 'relative',
        flexDirection: "row",
        justifyContent: "space-around",
    }, 
    BT_footer:{
        position: 'relative',
        flexDirection: "row",
        justifyContent: "space-around", 
    },  
    SaveBT_footer:{
        position: "relative",
        width: 170,
        height: 50,
        borderRadius: 40,
    },
    Save_icon:{
        position: 'absolute',
        width: 170,
        height: 50,
        borderRadius: 40,
        backgroundColor: '#3DA9FC' 
    },
    Save_text:{
        position: "absolute",
        width: 110,
        height: 28,
        top: 10,
        left: 30,
        
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 28,
        textAlign: "center",
        color: "#FFFFFF",
    },
    DeleteBT_footer:{
        position: "relative",
        width: 170,
        height: 50,
        borderRadius: 40,
    },
    Delete_icon:{
        position: 'absolute',
        width: 170,
        height: 50,
        borderRadius: 40,
        backgroundColor: `#dc143c` 
    },
    Delete_text:{
        position: "absolute",
        width: 110,
        height: 28,
        top: 10,
        left: 30,
        
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 24,
        lineHeight: 28,
        textAlign: "center",
        color: "#FFFFFF",
    },
});
