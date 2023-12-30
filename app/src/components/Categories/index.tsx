
import { CategoryContainenr,Icon } from './style';
import { Text } from '../Text';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { Category } from '../../types/Category';

interface CategoriesProps{
  categories: Category[];
  onSelectCategoty: (categoryId:string) => void;
}

export function Categories({categories,onSelectCategoty}:CategoriesProps){
  const [selectedCategory,setSelectedCategory] = useState('');


  function handleSelectCategory(categoryId: string){
    const category = selectedCategory === categoryId ? '' : categoryId;
    onSelectCategoty(category);
    setSelectedCategory(category);

  }
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingRight: 24}}
      data={categories}
      keyExtractor={category => category._id}
      renderItem={({item: category}) => {
        const isSelected = selectedCategory === category._id;
        return(
          <CategoryContainenr onPress={() =>  handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>

            <Text opacity={isSelected ? 1 : 0.5}>{category.name}</Text>
          </CategoryContainenr>
        );
      }}
    />
  );
}
