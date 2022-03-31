import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Alert,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Keyboard,
} from "react-native";
import Todo from "./Todo";
import TodoDataService from "../services/todo.service";

export default function Home({ route,navigation }) {
    const [Items, setItems] = useState();
    const [todoItems, settodoItems] = useState([]);

    useEffect(() => {
            if(Items == null)
            setTimeout(() => {retrieveTodo(); }, 1500);
    }, [todoItems]);

    const retrieveTodo = () => {
        TodoDataService.getAll()
            .then(response => {
                settodoItems(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    };
    


    const handleAddTodo = () => {
        navigation.navigate('Add');
    };

    const handleedit = (item) => {
        navigation.navigate('Edit', item);
    }

    const handleSearch = () => {
        TodoDataService.findByTitle(Items)
        .then(response => {
            settodoItems(response.data)
            
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <View style={styles.container}>
            {/* ส่วนหัว search_title และ ปุ่ม search */}
            <View style={styles.Header_Footer}>
                <Text style={styles.Header_Title}>Todo-List</Text>

                <View style={styles.Search_Footer}>
                    <View style={styles.Search_Title}>
                        <TextInput
                            testID="Search-text"
                            style={styles.Search_Holder}
                            placeholder={"Search"}
                            onChangeText = {(text) => ( setItems(text)  )  }
                        />
                    </View>

                    <Pressable
                        testID="Search-button"
                        style={styles.Button_Footer}
                        title="Search"
                        onPress={() => handleSearch()}
                    >
                        <Text style={styles.Search_Button} >Search</Text>
                    </Pressable>
                </View>
            </View>

            {/* ส่วนของ todo-list เลื่อนขึ้นเลื่อนลงได้เมื่อเกินหน้าจอ   */}
            <View style={styles.Body_footer}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    style={styles.Scrollview_size}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.items}>
                        {todoItems.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                >
                                    <Todo 
                                        testID= {item.title}
                                        todo = {item} 
                                        onPress = {() => handleedit({item})}
                                    />
                                </View>
                            );
                        })}
                        { todoItems.length ? <View></View> : <View><Text style={styles.Notfound_text} testID="not-found" >Not Found</Text></View> }
                    </View>
                </ScrollView>
            </View>

            {/* ส่วนของ Add-todo ปุ่ม + กับ ช่องใส่หัวข้อ  */}
            <View
                style={styles.writeTodoWrapper}
            >
                <TouchableOpacity 
                testID="addbutton"
                onPress={() => handleAddTodo()}>
                    <View style={styles.Add_Button}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
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
        width: 160,
        height: 28,
        left: 127,
        top: 40,
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 28,
        lineHeight: 28,
        fontWeight: 'bold',
        textAlign: "center",
        color: "#FFFFFF",
    },
    Header: {
        position: "absolute",
        width: 412,
        height: 26,
        left: 0,
        top: 135,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
    },
    Search_Footer: {
        position: "absolute",
        width: 350,
        height: 40,
        left: 30,
        top: 80,
    },
    Search_Title: {
        position: "absolute",
        width: 260,
        height: 40,
        backgroundColor: `#87cefa`,
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
    },
    Button_Footer: {
        position: "absolute",
        width: 80,
        height: 40,
        left: 260,
        backgroundColor: "#FFFFFF",
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
    },
    Search_Button: {
        position: "absolute",
        width: 72.62,
        height: 21,
        top: 10,
        left: 5,
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 18,
        lineHeight: 21,
        color: "#3DA9FC",
    },
    Search_Holder: {
        position: "absolute",
        width: 230,
        height: 40,
        left: 15,
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 15,
        lineHeight: 28,
    },
    Body_footer: {
        position: "absolute",
        width: 412,
        height: 530,
        top: 130,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#FFFFFF"
    },
    Scrollview_size:{
        position: "absolute",
        width: 410,
        height: 450,
        borderRadius: 40,
        padding: 15,
        top: 20,
        backgroundColor: "#FFFFFF",
    },
    writeTodoWrapper: {
        position: "absolute",
        bottom: 5,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        borderRadius: 60,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        width: 250,
    },
    Add_Button: {
        width: 80,
        height: 80,
        backgroundColor: "#3DA9FC",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#C0C0C0",
        borderWidth: 1,
    },
    addText: {
        position: "absolute",
        width: 38,
        height: 38,
        // fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 48,
        lineHeight: 48,
        textAlign: "center",
        color: "#FFFFFF",
    },
    items: {
        marginTop: 30,
    },
    Notfound_text:{
        textAlign: "center",
        fontSize: 20,
    }
});
