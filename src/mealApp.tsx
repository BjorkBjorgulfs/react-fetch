import {useState} from "react";
import styled from "styled-components";

// Interface to define the structure of a Meal object
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
}

// Here are all the styles for the components using styled-components

const Webpage = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem 4rem;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`;

const ColumnContainer = styled.div`
  display: flex;
  gap: 3rem;
`;

const Column = styled.div`
  flex: 1;
  width: 50%;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const SearchInput = styled.input`
  min-width: 10rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  height: 2rem;
  padding: 0.5rem 1rem;
  background-color: #f1d29d;
  color: #000000;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const MealList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: start;
  margin-top: 1rem;
  gap: 1rem;
  padding: 0;
  list-style-type: none;
`;

const MealItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
`;

const MealListImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 0.4rem;
`;

const MealImage = styled.img`
  width: 12rem;
  height: 12rem;
  height: auto;
  border-radius: 0.4rem;
`;

const MealDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  margin-block: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-block: 0.5rem;
`;

const Subtitle = styled.h3`
  font-size: 1.25rem;
  margin-block: 0.5rem;
`;

const Text = styled.p`
  font-size: 1rem;
  margin-block: 0.5rem;
`;

const IngredientList = styled.ul`
  margin-block: 0.5rem;
`;

const IngredientItem = styled.li`
  margin-block: 0.25rem;
`;

// This is the MealApp component that will be rendered in the App component
export default function MealApp() {
  // State to hold the user's ingredient input
  const [ingredient, setIngredient] = useState<string>("");
  // State to hold the list of meals returned from the API
  const [meals, setMeals] = useState<Meal[]>([]);
  // State to hold the details of the currently selected meal
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  // Function to fetch meals based on the ingredient entered by the user
  const fetchMeals = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      setMeals(data.meals || []); // Update the meals state with the data from the API
      setSelectedMeal(null); // Clear any previously selected meal
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  // Function to fetch a random meal from the API
  const fetchRandomMeal = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/random.php`
      );
      const data = await response.json();
      setMeals([data.meals[0]]); // Update the meals state with the random meal
      setSelectedMeal(null);  // Clear any previously selected meal
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
  };

  // Function to fetch detailed information about a selected meal
  const fetchMealDetails = async (meal: Meal) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const data = await response.json();
      setSelectedMeal(data.meals[0]); // Update the selectedMeal state with the detailed meal data
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  }

  // Function to retrieve ingredients and their measurements from the selected meal
  const getIngredientsAndMeasurements = (meal: Meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = (meal as any)[`strIngredient${i}`];
      const measure = (meal as any)[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure ? measure : ""} ${ingredient}`); // Combine measurement and ingredient
      }
    }
    return ingredients;
  };
  

  return (
    <Webpage>
      <Container>
        <TopContainer>
          <MainTitle> What should we have for dinner? 🍽️ </MainTitle>

          {/* Search bar and button to fetch meals based on an ingredient */}
          <SearchContainer>
            <SearchInput
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="Enter main ingredient"
            />

            <Button onClick={fetchMeals}> Search </Button>
          </SearchContainer>
            
          {/* Button to fetch a random meal */}
          <Button onClick={fetchRandomMeal}> Get a random meal </Button>
        </TopContainer>

        <ColumnContainer>
          <Column>
            <Title>Results</Title>

            {/* Display the list of meals returned from the API */} 
            {meals.length > 0 ? (
              <MealList>
                {meals.map((meal) => (
                  <MealItem>
                    <MealListImage
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                    />

                    <Text>{meal.strMeal}</Text>

                    {/* Button to view details of the meal */}
                    <Button onClick={() => fetchMealDetails(meal)}> View Details </Button>
                  </MealItem>
                ))}
              </MealList>
            ) : (
              <Text>No results found</Text>
            )}
          </Column>

          <Column>
            {/* Display detailed information about the selected meal */}
            {selectedMeal && (
              <MealDetailsContainer>
                <Title>Details</Title>

                <Subtitle>{selectedMeal.strMeal}</Subtitle>

                <MealImage
                  src={selectedMeal.strMealThumb}
                  alt={selectedMeal.strMeal}
                />

                <Subtitle>Category:</Subtitle> 

                <Text>{selectedMeal.strCategory}</Text>

                <Subtitle>Origin:</Subtitle> 

                <Text>{selectedMeal.strArea}</Text>

                <Subtitle>Ingredients</Subtitle>

                <IngredientList>
                  {getIngredientsAndMeasurements(selectedMeal).map((item, index) => (
                    <IngredientItem key={index}>
                      {item}
                    </IngredientItem>
                  ))}
                </IngredientList>

                <Subtitle>Instructions</Subtitle>
                
                <Text>{selectedMeal.strInstructions}</Text>
              </MealDetailsContainer>
            )}
          </Column>
        </ColumnContainer>
      </Container>
    </Webpage>
  );
};