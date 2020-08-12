class Character < ApplicationRecord
  belongs_to :user
  has_many :inventories
  has_many :equipments
  has_many :skills

def self.set_inventory(id)
  select("characters.name AS character_name, i.id, i.name, i.description, characters.id as character_id")
  .joins("INNER JOIN inventories i ON i.character_id = characters.id")
  .where("i.character_id = #{id}")
end

 def self.set_armor(id)
  select("characters.name AS character_name, characters.id as character_id, e.name, e.id, e.character_id, 
          e.description, e.armor_class,e.armor")
  .joins("INNER JOIN equipment e ON e.character_id = characters.id")
  .where("e.armor = true AND e.character_id = #{id}")
 end

def self.set_weapons(id)
  select("characters.name AS character_name, characters.id as character_id, e.name, e.id, e.character_id,
          e.description, e.damage, e.range, e.weapon")
  .joins("INNER JOIN equipment e ON e.character_id = characters.id")
  .where("e.weapon = true AND e.character_id = #{id}")
end

def self.set_skills(id)
  select("characters.name AS character_name, characters.id as character_id, s.id, s.character_id,
          s.strength, s.dexterity, s.constitution, s.intelligence, s.wisdom, s.charisma, s.speed")
  .joins("INNER JOIN skills s ON s.character_id = characters.id")
  .where("s.character_id = #{id}")
end

end
