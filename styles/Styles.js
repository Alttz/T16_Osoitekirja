import { StyleSheet } from 'react-native';

export const MapScreenStyles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        },
        button: {
          width: "50%",
          alignItems: 'center',
          padding: 10,
          marginTop: 10,
          marginBottom: 10,
          borderRadius: 3,
        },
        buttonEnabled: {
          backgroundColor: '#007BFF',
        },
        buttonDisabled: {
          backgroundColor: '#CCCCCC',
        },
        buttonText: {
          color: 'white',
          fontWeight: 'bold',
        },

       });
 
 export const PlacefinderScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        marginTop: 50,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
        marginBottom: 15,
        marginLeft: '5%',
    },
    button: {
        width: "90%",
        alignItems: 'center',
        backgroundColor: '#007BFF',
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        alignSelf: 'center',
        borderRadius: 3,
    },
    input: {
        width: "90%",
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginBottom: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    showOnMapText: {
        color: 'grey',
        textAlign: 'right'
    }, });