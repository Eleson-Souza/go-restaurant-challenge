import React, { useEffect, useState } from "react";

import { Food } from "../../components/Food/Food";
import { Header } from "../../components/Header/Header";
import { ModalAddFood } from "../../components/ModalAddFood/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood/ModalEditFood";
import api from "../../services/api";
import { Food as IFood } from "../../utils/types";

import { FoodsContainer } from "./styles";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);

  useEffect(() => {
    const requestData = async () => {
      const response = await api.get("/foods");

      setFoods(response.data);
    };
    requestData();
  }, []);

  async function handleAddFood(food: IFood) {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateFood(food: IFood) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((food) => {
        return food.id !== foodUpdated.data.id ? food : foodUpdated.data;
      });

      setFoods(foodsUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);
    setFoods(foodsFiltered);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFood) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <div>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </div>
  );
}
