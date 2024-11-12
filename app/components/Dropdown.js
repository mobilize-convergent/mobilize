import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Modal,
    FlatList,
} from 'react-native';

const Dropdown = ({ 
    label, 
    data, 
    onSelect, 
    selectedValue,
    placeholder = "Select an option" 
}) => {
    const [visible, setVisible] = useState(false);
    
    const selectedItem = data.find(item => item.value === selectedValue);
    
    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.option} 
            onPress={() => {
                onSelect(item.value);
                setVisible(false);
            }}
        >
            <Text style={styles.optionText}>
                {item.label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            
            <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setVisible(true)}
            >
                <Text style={[styles.selectedText, !selectedItem && styles.placeholderText]}>
                    {selectedItem ? selectedItem.label : placeholder}
                </Text>
                <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={styles.modalContent}>
                        {data.map((item) => (
                            <TouchableOpacity
                                key={item.value}
                                style={styles.option}
                                onPress={() => {
                                    onSelect(item.value);
                                    setVisible(false);
                                }}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selectedValue === item.value && styles.selectedOptionText
                                ]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    selectedText: {
        fontSize: 16,
        color: '#000',
    },
    placeholderText: {
        color: '#999',
    },
    arrow: {
        fontSize: 14,
        color: '#666',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 5,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    selectedOptionText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default Dropdown;