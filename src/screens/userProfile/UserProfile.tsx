import React, {useState} from 'react';
import {Button, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

const UserProfile = (): JSX.Element => {
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    moment.locale(lang);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Change Language" onPress={() => setModalVisible(true)} />

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('select_language')}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => switchLanguage('en')}>
              <Text style={styles.modalButtonText}>English</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => switchLanguage('vi')}>
              <Text style={styles.modalButtonText}>Vietnamese</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => switchLanguage('hi')}>
              <Text style={styles.modalButtonText}>Hindi</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserProfile;
