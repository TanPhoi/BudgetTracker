import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React, {memo, useState} from 'react';
import {ArrowDownIcon} from '@/assets/svg';
import {colors} from '@/themes/colors';
import {typography} from '@/themes/typography';
import {ScrollView} from 'react-native-gesture-handler';
import {spacing} from '@/themes/spacing';
import {DropdownOptionType} from '@/commons/dropdown/dropdownOptionType';
import {t} from 'i18next';

type SelectOptionProps = {
  label: string;
  data: DropdownOptionType[];
  onSelect: (item: DropdownOptionType, isOpen: boolean) => void;
  defaultSelected: string;
  isOpen: boolean;
  onToggle: () => void;
};

const SelectOption = ({
  label,
  data,
  onSelect,
  defaultSelected,
  isOpen,
  onToggle,
}: SelectOptionProps) => {
  const [selected, setSelected] = useState<DropdownOptionType | null>(null);

  const handleSelect = (item: DropdownOptionType): void => {
    setSelected(item);
    onSelect(item, false);
  };

  const renderItem = ({item}: {item: DropdownOptionType}) => (
    <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
      {item.icon && (
        <View style={[styles.iconContainer, {backgroundColor: item.color}]}>
          <item.icon />
        </View>
      )}
      <Text style={typography.Heading11}>{t(`categories.${item.option}`)}</Text>
    </TouchableOpacity>
  );

  const displayedOption = selected
    ? t(`categories.${selected.option}`)
    : t(`categories.${defaultSelected}`);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={onToggle}>
        <Text style={[typography.Heading3, styles.label]}>{label}</Text>
        <View style={styles.dropdownControl}>
          <Text style={typography.Heading10}>{displayedOption}</Text>
          <ArrowDownIcon width={10} height={5} color={colors.pureWhite} />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownContainer}>
          {selected && (
            <TouchableOpacity
              onPress={() => handleSelect(selected)}
              style={styles.selectedItemContainer}>
              {selected.icon && (
                <View
                  style={[
                    styles.iconContainer,
                    {backgroundColor: selected.color},
                  ]}>
                  <selected.icon />
                </View>
              )}
              <Text style={typography.Heading11}>
                {t(`categories.${selected.option}`)}
              </Text>
            </TouchableOpacity>
          )}

          <Text style={[typography.Heading10, styles.categoryText]}>
            {t('all_categories')}
          </Text>
          <ScrollView>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.key.toString()}
              style={styles.flatList}
              scrollEnabled={false}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  flatList: {
    flexGrow: 1,
  },
  dropdown: {
    paddingTop: spacing.s,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.s,
    borderColor: colors.pureWhite,
    borderRadius: 16,
    backgroundColor: colors.indigoNight,
    marginHorizontal: spacing.md,
    elevation: 4,
  },
  label: {
    color: colors.pureWhite,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '86%',
    width: '80%',
    backgroundColor: colors.midnightBlack,
    zIndex: 1,
    alignSelf: 'center',
    elevation: 6,
    borderRadius: 6,
    maxHeight: 400,
    overflow: 'hidden',
  },
  item: {
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItemContainer: {
    paddingLeft: spacing.sm,
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    columnGap: 16,
  },
  categoryText: {
    marginLeft: spacing.s,
    marginVertical: spacing.sm,
    color: colors.transparentWhite,
  },
  dropdownControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.goldenRod,
    paddingBottom: 8,
  },
});

export default memo(SelectOption);
