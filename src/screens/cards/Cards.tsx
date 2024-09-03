import {img_chip} from '@/assets/images';
import {AddIcon, MasterCardIcon, WavePatternIcon} from '@/assets/svg';
import Button from '@/commons/buttons/Button';
import Header from '@/commons/headers/Header';
import InputCard from '@/commons/inputs/InputCard';
import {
  CHECK_CARD_NUMBER,
  ERROR_MISSING_FIELD,
} from '@/constants/message.constant';
import {calculateTotalIncomeAmount} from '@/helpers/transaction.helper';
import {Card} from '@/models/card.model';
import {Transaction} from '@/models/transaction.model';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {getCardService, setCardService} from '@/services/cardManagement';
import {getTransactionsService} from '@/services/transactionManagement';
import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import {formatCardNumber} from '@/utils/formatCardNumber';
import {formatExpirationDate} from '@/utils/formatExpirationDate';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import React, {JSX, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';

type CardsProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'TabNavigation'>;
};

const {width, height} = Dimensions.get('window');

const Cards = ({navigation}: CardsProps): JSX.Element => {
  const {t} = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [card, setCard] = useState<Card>({
    cardNumber: '',
    name: '',
    expirationDate: '',
    cvv: 0,
  });

  useEffect(() => {
    const fetchCards = (): void => {
      getCardService<Card[]>().then(data => {
        const cardsWithColors = (data || []).map(card => ({
          ...card,
          startColor: getRandomColor(),
          stopColor: getRandomColor(),
        }));
        setCards(cardsWithColors);
      });
    };

    const fetchExpenseAmount = (): void => {
      getTransactionsService<Transaction[]>().then(data => {
        if (data) {
          const totalIncomeAmount = calculateTotalIncomeAmount(data);
          setTotalAmount(totalIncomeAmount);
        }
      });
    };
    fetchExpenseAmount();
    fetchCards();
  }, []);

  const handleSnapToItem = (index: number): void => {
    setCurrentIndex(index);
  };

  const handleCardNumber = (value: string): void => {
    setCard(prev => ({
      ...prev,
      cardNumber: formatCardNumber(value),
    }));
  };

  const handleCardHolderName = (value: string): void => {
    setCard(prev => ({
      ...prev,
      name: value,
    }));
  };

  const handleExpirationDate = (value: string): void => {
    setCard(prev => ({
      ...prev,
      expirationDate: formatExpirationDate(value),
    }));
  };

  const handleSecurityCode = (value: string): void => {
    setCard(prev => ({
      ...prev,
      cvv: Number(value),
    }));
  };

  const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleNext = (): void => {
    if (
      card.cardNumber.length < 16 ||
      card.expirationDate.length < 5 ||
      card.cvv.toString().length < 3 ||
      !card.name
    ) {
      return Alert.alert(ERROR_MISSING_FIELD);
    }

    if (getCardNumber(card.cardNumber)) {
      return Alert.alert(CHECK_CARD_NUMBER);
    }

    const newCard: Card = {
      cardNumber: card.cardNumber,
      name: card.name,
      expirationDate: card.expirationDate,
      cvv: card.cvv,
    };

    setCardService(newCard);
    setCards(prevCards => [...prevCards, newCard]);
  };

  const getCardNumber = (value: string): boolean => {
    return cards.some(card => card.cardNumber === value);
  };

  const handleBack = (): void => {
    navigation.goBack();
  };

  const RenderItem = (item: Card) => (
    <LinearGradient
      colors={[
        item.startColor || getRandomColor(),
        item.stopColor || getRandomColor(),
      ]}
      locations={[0.2, 0.9]}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={[styles.cardPayment]}>
      <View style={styles.icMasterCard}>
        <MasterCardIcon />
      </View>
      <View style={styles.boxChip}>
        <Image style={styles.imgChip} source={img_chip} />
        <WavePatternIcon />
      </View>
      <Text style={[typography.Heading14, styles.txtNumberCard]}>
        {item.cardNumber}
      </Text>
      <View style={styles.boxDate}>
        <Text style={typography.Heading15}>{t('valid_thru')}</Text>
        <Text style={typography.Heading16}>{item.expirationDate}</Text>
      </View>
      <Text style={[typography.Heading16, styles.txtName]}>{item.name}</Text>
    </LinearGradient>
  );

  return (
    <LinearGradient
      colors={[colors.midnightBlack, colors.semiTransparentRed]}
      locations={[0.9, 1]}
      start={{x: 1, y: 1}}
      end={{x: 0.4, y: 0}}
      style={styles.gradient}>
      <View style={styles.container}>
        <Header label={t('wallet')} onPress={handleBack} />
        <ScrollView>
          <Text style={[typography.Heading5, styles.txtCards]}>
            {t('cards')}
          </Text>
          <View style={styles.divider}></View>

          {cards.length >= 1 ? (
            <View style={{height: height / 3}}>
              <Carousel
                style={styles.carousel}
                width={width - 20}
                pagingEnabled
                loop
                data={cards}
                autoPlayReverse
                mode="vertical-stack"
                modeConfig={{
                  stackInterval: -16,
                  moveSize: 500,
                }}
                onSnapToItem={handleSnapToItem}
                renderItem={({item}) => <RenderItem {...item} />}
              />

              <View style={styles.dotsContainer}>
                {cards.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          index === currentIndex
                            ? colors.pureWhite
                            : colors.goldenRod,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          ) : (
            <View
              style={{
                height: height / 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {cards.length === 0 && (
                <LinearGradient
                  colors={[colors.midnightBlack, colors.goldenRod]}
                  locations={[0.2, 0.9]}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  style={[styles.cardPayment, styles.boxCard]}>
                  <View style={styles.icMasterCard}>
                    <MasterCardIcon />
                  </View>
                  <View style={styles.boxChip}>
                    <Image style={styles.imgChip} source={img_chip} />
                    <WavePatternIcon />
                  </View>
                  <Text style={[typography.Heading14, styles.txtNumberCard]}>
                    0000 0000 0000 0000
                  </Text>
                  <View style={styles.boxDate}>
                    <Text style={typography.Heading15}>{t('valid_thru')}</Text>
                    <Text style={typography.Heading16}>00/00</Text>
                  </View>
                  <Text style={[typography.Heading16, styles.txtName]}>
                    Nguyen Van A
                  </Text>
                </LinearGradient>
              )}
            </View>
          )}

          <Text style={[typography.Heading4, styles.txtAmount]}>
            {t('currency')}
            {totalAmount}
          </Text>
          <Text style={[typography.Heading3, styles.txtAvailableBalance]}>
            {t('available_balance')}
          </Text>

          <View style={styles.cardContainer}>
            <View style={styles.boxTextCard}>
              <AddIcon width={13} height={13} color={colors.goldenRod} />
              <View>
                <Text style={typography.Heading18}>{t('add_card')}</Text>
                <Text style={[typography.Heading3, styles.txtAdd]}>
                  {t('add_your_credit')}
                </Text>
              </View>
            </View>

            <InputCard
              placeHolder={t('card_number')}
              onChange={handleCardNumber}
              keyboardType={'numeric'}
              value={card.cardNumber}
              maxLength={19}
            />

            <InputCard
              placeHolder={t('card_name')}
              onChange={handleCardHolderName}
              keyboardType={'default'}
              value={card.name}
            />

            <View style={styles.boxInput}>
              <View style={styles.input}>
                <InputCard
                  placeHolder={t('expiration_data')}
                  onChange={handleExpirationDate}
                  keyboardType={'numeric'}
                  value={card.expirationDate}
                  maxLength={5}
                />
              </View>
              <View style={styles.input}>
                <InputCard
                  placeHolder={t('security_code')}
                  onChange={handleSecurityCode}
                  keyboardType={'numeric'}
                  value={card.cvv ? card.cvv.toString() : ''}
                  maxLength={3}
                />
              </View>
            </View>

            <View style={styles.button}>
              <Button label={t('next')} onPress={handleNext} />
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: spacing.xl,
  },
  txtCards: {
    marginTop: spacing.s,
    color: colors.goldenRod,
    textAlign: 'center',
  },
  divider: {
    marginTop: spacing.xxs,
    marginHorizontal: spacing.md,
    height: 3,
    backgroundColor: colors.transparentWhite,
  },
  cardPayment: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: 15,
  },
  boxCard: {
    width: '90%',
  },
  icMasterCard: {
    position: 'absolute',
    bottom: 13,
    right: 14,
  },
  boxChip: {
    marginTop: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 24,
  },
  imgChip: {
    width: 60,
    height: 42,
  },
  txtNumberCard: {
    marginTop: spacing.sm,
    flexShrink: 0,
    fontSize: 20,
    width: '100%',
  },
  boxDate: {
    marginTop: spacing.xxs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
  },
  txtName: {
    marginTop: spacing.xs,
  },
  carousel: {
    width: '100%',
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    bottom: -30,
    alignSelf: 'center',
    columnGap: 15,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
  },
  txtAvailableBalance: {
    textAlign: 'center',
    color: colors.pureWhite,
  },
  txtAmount: {
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  cardContainer: {
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white_transparent_10,
    rowGap: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.white_transparent_20,
  },
  boxTextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  txtAdd: {
    color: colors.pureWhite,
  },
  boxInput: {
    flexDirection: 'row',
    columnGap: 17,
  },
  input: {
    flex: 1,
  },
  button: {
    alignSelf: 'center',
    marginTop: spacing.lg,
  },
});

export default Cards;
