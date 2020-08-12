class Api::CharactersController < ApplicationController


   def index
    render json: User.find(params[:user_id]).characters.all
  end

  def show
    character = Character.find(params[:id])
    render json: character
  end

  def create 
  end

  def update
  end

  def destroy
    render json: Character.find(params[:id]).destroy

  end

  def inventory
    render json: Character.set_inventory(params[:character_id])
  end

  def armor
    render json: Character.set_armor(params[:character_id])
  end

  def weapons
    render json: Character.set_weapons(params[:character_id])
  end

  def skills
    render json: Character.set_skills(params[:character_id])
  end

end
