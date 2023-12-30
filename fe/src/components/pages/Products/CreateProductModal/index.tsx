import closeIcon from '../../../../assets/images/close-icon.svg';
import imgDefault from '../../../../assets/images/default-image.jpg';
import React, { ChangeEvent, useState, useEffect,useRef } from 'react';
import { Overlay,ModalBody,SelectedImage,InforProducts,InforGen,ButtonSelect,AreaDescription,Ingredients,DetailsProduct,Actions } from './styles';
import { api } from '../../../../utils/api';
import { Categoriry } from '../../../types/Categories';
import { CreateIngredient } from '../Ingredient';
import { Ingredient } from '../../../types/Ingredient';
import { testeIngredient } from '../../../types/testeIngredient';
interface CreateProductModalProps{
  onClose: () => void;
  visible: boolean;
}

export function CreateProductModal({onClose,visible}:CreateProductModalProps){
  const inputImg = React.useRef<HTMLInputElement>(null);
  const [isImg,setIsImg] = useState<FileList>();
  const [isVisibleImg,setVisibleIsImg] = useState<string | null>(null);

  const [isCetegorys,setIsCategorys] = useState<Categoriry[]>([]);

  const [isNameProduct,setIsNameProduct] = useState('');
  const [isPriceProduct,setIsPriceProduct] = useState('');
  const [isIngredientsProduct,setIsIngredientsProduct] = useState<[{name:string;icon:string}] | null>([{name:'Teste',icon:'tste'}]);
  const [isCategoryProduct,setIsCategoryProduct] = useState('');
  const [isDescription,setIsDescription] = useState('');

  const [isVisibleModalIngredient,setIsVisibleModalIngredientModal] = useState(false);
  const [isIngredients,setIsIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise1 = api.get('/ingredients');
        const promise2 = api.get('/categories');

        const [reponseIngredients, responseCategories] = await Promise.all([promise1, promise2]);

        setIsIngredients(reponseIngredients.data);
        setIsCategorys(responseCategories.data);
      } catch (error) {
        // Tratamento de erros
      }
    };

    fetchData();

  },[]);

  async function createProduct(){

    const playLoad = {
      name: isNameProduct,
      description: isDescription,
      price: isPriceProduct,
      category: isCategoryProduct,
      image: isImg![0],
      ingredients: [
        { "name": "Mussarela", "icon": "🧀" },
        { "name": "Ovo", "icon": "🥚" },
        { "name": "Salada", "icon": "🍅" }
      ],
    };
    console.log(playLoad);
    await api.post('/products',playLoad,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });


    onClose();
  }


  const handleFileSelect = () => {
    inputImg.current!.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setIsImg(files!);
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setVisibleIsImg(reader.result as string);
      };
      reader.readAsDataURL(file);

    }
  };

  function handleCloseModal(){
    setIsVisibleModalIngredientModal(false);
  }

  function registerIngredients(iconIngredient:string,nameIngredient:string){
    const obj = {name:nameIngredient,icon:iconIngredient};
    const newObjs = [{...isIngredientsProduct},obj];

    console.log(isIngredientsProduct);


  }

  if(!visible){
    return null;
  }

  return(




    <Overlay>
      <CreateIngredient
        visible={isVisibleModalIngredient}
        isLoading={false}
        closeModal={handleCloseModal}
      />
      <ModalBody>
        <header>

          <button type='button' onClick={() => onClose()}>
            <img src={closeIcon} alt="Fecha Modal"/>
          </button>
        </header>
        <form onSubmit={createProduct}>
          <InforProducts>
            <SelectedImage>
              <ButtonSelect onClick={(event) => {event.preventDefault(); handleFileSelect();}}
                style={{
                  backgroundImage: isVisibleImg ? `url(${isVisibleImg})` : `url(${imgDefault})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  border: 'none',
                }}
              ></ButtonSelect>
              <input type='file' ref={inputImg} style={{display:'none',}} onChange={handleFileChange} required></input>
            </SelectedImage>

            <InforGen>
              <label>Nome do produto</label>
              <input type='text' onChange={(event) => setIsNameProduct(event.target.value)} required></input>
              <label>Preço</label>
              <input type='text' onChange={(event) => setIsPriceProduct(event.target.value)} required></input>
              <label>Categoria</label>
              <select onChange={(event) => setIsCategoryProduct(event.target.value)} required>
                <option value={''}>Selecione a Categoria</option>
                {isCetegorys.map((category) => (
                  <>
                    <option value={category._id}>{`${category.icon}`}{`${category.name}`}</option>
                  </>
                ))}
              </select>
            </InforGen>
          </InforProducts>
          <DetailsProduct>
            <AreaDescription onChange={(event) => setIsDescription(event.target.value)} required></AreaDescription>
            <Ingredients>
              {isIngredients.map((ingredient) => (
                <>
                  <div>
                    <input type='checkbox' name='ingredients' value={`${ingredient._id}`}  onClick={() => registerIngredients(`${ingredient.icon}`,`${ingredient.name}`)}></input>
                    <label>{`${ingredient.icon}${ingredient.name}`}</label>
                  </div>
                </>
              ))}
              <input type='button' value='+ ingrediente' style={{border:'none',}} onClick={() => setIsVisibleModalIngredientModal(true)}></input>
            </Ingredients>
          </DetailsProduct>
          <Actions>
            <button type='submit' className='primary'><span>✔</span> Cadastrar</button>
            <button type='button' className='secondary' onClick={onClose}>
              <span>❌</span>
              <strong>Cancelar Cadastro</strong>
            </button>
          </Actions>
        </form>
      </ModalBody>
    </Overlay>
  );
}
