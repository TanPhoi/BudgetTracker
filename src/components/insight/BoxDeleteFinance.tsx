import {BackIcon} from '@/assets/svg';
import Button from '@/commons/buttons/Button';
import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import {t} from 'i18next';
import React, {memo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type BoxDeleteFinanceProps = {
  currentMonthName: string;
  currentMonthPercent: number;
  handleDelete: (isConfirmed: 'yes' | 'no') => void;
  setModalType: (type: 'edit' | 'delete' | 'create' | 'chart') => void;
};

const BoxDeleteFinance = ({
  currentMonthName,
  currentMonthPercent,
  handleDelete,
  setModalType,
}: BoxDeleteFinanceProps): JSX.Element => {
  const [confirmationStatus, setConfirmationStatus] = useState<'yes' | 'no'>(
    'yes',
  );
  const isConfirmed = confirmationStatus === 'yes';

  const handleConfirmationStatus = (status: 'yes' | 'no'): void => {
    setConfirmationStatus(status);
  };

  const handleConfirmDeletion = (): void => {
    handleDelete(confirmationStatus);
  };

  return (
    <View style={styles.planEdit}>
      <View>
        <View style={styles.boxHeader}>
          <TouchableOpacity onPress={(): void => setModalType('chart')}>
            <BackIcon width={16} height={16} />
          </TouchableOpacity>
          <Text style={typography.Heading6}>{t('delete_current_plan')}</Text>
          <View style={styles.virtualView}></View>
        </View>
        <Text style={[typography.Heading3, styles.txt]}>
          {t(`${currentMonthName}`)} {currentMonthPercent}%
        </Text>
      </View>
      <View>
        <View style={styles.boxTxt}>
          <Text style={[typography.Heading10, styles.txt]}>
            {t('do_you_really_want_to_delete')}
          </Text>
          <Text style={[typography.Heading10, styles.txt]}>
            {t('the_current_plan')}
          </Text>
        </View>

        <View style={styles.boxButton}>
          <TouchableOpacity
            style={[styles.box, isConfirmed && styles.boxConfirmed]}
            onPress={(): void => handleConfirmationStatus('yes')}>
            <Text
              style={[
                typography.Heading17,
                isConfirmed && styles.selectTxtConfirmed,
              ]}>
              {t('yes')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.box, !isConfirmed && styles.boxConfirmed]}
            onPress={(): void => handleConfirmationStatus('no')}>
            <Text
              style={[
                typography.Heading17,
                !isConfirmed && styles.selectTxtConfirmed,
              ]}>
              {t('no')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.button}>
        <Button label={'Delete'} onPress={handleConfirmDeletion} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  planEdit: {
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.white_transparent_10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.white_transparent_20,
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  virtualView: {
    width: 16,
    height: 16,
  },
  boxTxt: {
    marginTop: spacing.md,
  },
  txt: {
    marginTop: 6,
    alignSelf: 'center',
  },
  boxButton: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  box: {
    width: 44,
    height: 44,
    backgroundColor: colors.darkIndigo,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  button: {
    marginTop: spacing.md,
    alignSelf: 'center',
  },
  boxConfirmed: {
    borderColor: colors.goldenRod,
    borderWidth: 1,
  },
  selectTxtConfirmed: {
    color: colors.goldenRod,
  },
});

export default memo(BoxDeleteFinance);
