import {typography} from '@/styles';
import {ScreenWidth} from '@rneui/base';
import {makeStyles} from '@rneui/themed';
const WIDTH_HEIGHT_FLASH_SALE_ITEM = (ScreenWidth - 32 - 10) / 3;

const useStyles = makeStyles(({colors}) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  timeCount: {
    flexDirection: 'row',
    gap: 5,
    alignContent: 'center',
  },
  textTime: {
    ...typography.body3Bold,
    backgroundColor: '#FFEBEB',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  listFlashSale: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 5,
  },
  flashSaleItem: {
    borderRadius: 9,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    elevation: 10,
    width: WIDTH_HEIGHT_FLASH_SALE_ITEM,
    height: WIDTH_HEIGHT_FLASH_SALE_ITEM,
    position: 'relative',
  },
  textDiscount: {
    ...typography.body2Bold,
    backgroundColor: '#F81140',
    paddingHorizontal: 8,
    paddingVertical: 6,
    color: '#FFFFFF',
    width: 'auto',
    height: 30,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 6,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
  },
  imageFlashSale: {
    width: WIDTH_HEIGHT_FLASH_SALE_ITEM,
    height: WIDTH_HEIGHT_FLASH_SALE_ITEM - 10,
  },
}));

export default useStyles;
