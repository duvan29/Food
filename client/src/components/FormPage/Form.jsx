import React from "react";
import { useState } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { Link } from "react-router-dom";
import { addRecipe } from '../../redux/actions/actions';
import style from './Form.module.css'

function validate(input) {
    const errors = {};

    const isImageURL = (url) => {
        const regex = /\.(jpe?g|png)$/i;
        return regex.test(url);
      }; 

    if (!input.name) errors.name = 'Please complete with a recipe name';
    if (!input.summary) errors.summary = 'Please add some comments about your recipe';
    if (!isImageURL(input.image)) errors.image = "The image must be a URL";
    if (!input.image) errors.image = 'Please add image to recipe';
    if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'The score must be a number between 1 and 100';
    if (!input.stepByStep.length) errors.steps = 'Please detail the steps for your recipe';
    if (!input.diets.length) errors.diet = 'You must select at least one diet type';
    return errors;
};



const FormPage = ({ createRecipeData }) => {
    const dispatch = useDispatch();
    const { Diets, originRecipes } = useSelector((state) => state);
    const [errors, setErrors] = useState({})
    
    const [input, setInput] = useState({
        name: ''  ,
        summary: '',
        id: 0,
        image: '',
        healthScore: '',
        stepByStep: '',
        diets: [] 
    })

    const newId = originRecipes.sort((a, b) => b.id - a.id)


    function handleChange(e) {
        e.preventDefault();
        setInput((prevInput) => {   //de esta manera el componente muestra los cambios (componentdidupdate?) para poder ir validando
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value
            }
            const validations = validate(newInput);
            setErrors(validations)
            return newInput
        });

    };
    
    function handleCheckBox(e) {
       
        let newArray = input.diets;
        let find = newArray.indexOf(e.target.value);
        
        
        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }
        
        setInput({
            ...input,
            diets: newArray,
            id: newId[0].id++
        });
        const validations = validate(input);
        setErrors(validations)
        
    }
    
    function handleSubmit(e) {
         e.preventDefault();
         if (Object.values(errors).length > 0) {
             alert("Please complete the information required");
         } else if (
            input.name === '' && 
            input.summary === '' && 
            input.healthScore === '' &&
            input.image === '' &&
            input.stepByStep === '' &&
            !input.diets.length) {
            alert("Please complete the form");}
        else {
            dispatch(addRecipe(input));
            alert('New recipe added successfully!')
            setInput({
                name: "",
                id: 0,
                image: '',
                summary: '',
                healthScore: '',
                stepByStep: '',
                diets: []
            });
        }
    };
    
    
    return (
        <>
        <div className={style.contenedor}>
        <div className={style.createRecipeCard}>
            <Link to="/home" onClick={() => createRecipeData()} className={style.equisX}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-to-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#A63B32" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="10" y1="12" x2="20" y2="12" /><line x1="10" y1="12" x2="14" y2="16" /><line x1="10" y1="12" x2="14" y2="8" /><line x1="4" y1="4" x2="4" y2="20" /></svg></Link>
            <form onSubmit={e => handleSubmit(e)} > 
                <div >
                    <div >
                        <div  >
                            <div className={style.conjunto}>
                            <div className={style.lblNombre}>Name </div>
                            <input className={style.textNomb} name="name" type="text" placeholder="Arepas" value={input.name}  onChange={e => handleChange(e)}/>
                            </div>
                            {errors.name && (
                                <div >
                                <span className={style.error}>{errors.name}</span>
                                </div>
                            )}
                        </div>
                        <div>
                        <div className={style.conjunto}>
                            <div className={style.lblNombre}>Image </div>
                            <input className={style.textNomb} name="image" placeholder="URL" type="text" onChange={handleChange} />
                            </div>
                            {errors.image && (
                                <div >
                                <span className={style.error}>{errors.image}</span>
                                </div>
                            )}
                        </div>
                        <div >
                            <div className={style.conjunto}>
                            <h2 className={style.dietsAndHs} id="range-value"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heartbeat" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#A63B32" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572" /><path d="M3 13h2l2 3l2 -6l1 3h3" />
                            </svg> {input.healthScore}%</h2>
                            </div>
                            <input name="healthScore" type="range" min={1} max={100} value={input.healthScore} onChange={e => handleChange(e)}/>
                            {errors.healthScore && (
                                <div >
                                <span className={style.error}>{errors.healthScore}</span>
                                </div>
                            )}
                        </div>
                        <div >
                            <div className={style.lblNombre}>Summary</div>
                        </div>
                            <textarea className={style.textTarea} name="summary" type="text" rows="4" cols="78" value={`${input.summary}`} onChange={e => handleChange(e)}/>
                            {errors.summary && (
                                <div >
                                <span className={style.error}>{errors.summary}</span>
                                </div>
                            )}
                        
                        <div >
                            <div className={style.lblNombre}>Steps</div>
                            <textarea className={style.textTarea} name="stepByStep" type="text" rows="5" cols="78" value={`${input.stepByStep}`} onChange={e => handleChange(e)}/>
                            {errors.steps && (
                                <div >
                                <span className={style.error}>{errors.steps}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div >
                        <div className={style.lblNombre}>Diets </div>
                        <div className={style.containerDiets}>
                        {Diets.map(({name}) =>{
                            return (
                                <div key={name} className={style.diets}>
                                    <label >{name}</label>
                                    <input  type="checkbox" name={name} value={name} selected={input.diets.includes(name)} onChange={e => handleCheckBox(e)}/>
                                </div>
                            )
                        })}
                        </div>
                        {errors.diet && (
                            <div >
                                <span className={style.error}>{errors.diet}</span>
                            </div>
                        )}
                    </div>
                </div>
                <button class={style.botton} type="submit">Create Recipe</button>
            </form>
        </div>
        </div>
        </>
    )

};

export default FormPage;