import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Pokemon } from "../../../../../models/colyseus-models/pokemon"
import PokemonFactory from "../../../../../models/pokemon-factory"
import { DishByPkm } from "../../../../../core/dishes"
import { getPokemonData } from "../../../../../models/precomputed/precomputed-pokemon-data"
import { Emotion } from "../../../../../types"
import { RarityColor } from "../../../../../types/Config"
import { Ability } from "../../../../../types/enum/Ability"
import { Stat } from "../../../../../types/enum/Game"
import { Passive } from "../../../../../types/enum/Passive"
import { Pkm } from "../../../../../types/enum/Pokemon"
import { addIconsToDescription } from "../../utils/descriptions"
import { AbilityTooltip } from "../ability/ability-tooltip"
import SynergyIcon from "../icons/synergy-icon"
import { Item } from "../../../../../types/enum/Item"
import { Synergy } from "../../../../../types/enum/Synergy"
import PokemonPortrait from "../pokemon-portrait"
import "./game-pokemon-detail.css"

export function GamePokemonDetail(props: {
  pokemon: Pkm | Pokemon
  shiny?: boolean
  emotion?: Emotion
}) {
  const { t } = useTranslation()
  const pokemon: Pokemon = useMemo(
    () =>
      typeof props.pokemon === "string"
        ? PokemonFactory.createPokemonFromName(props.pokemon)
        : props.pokemon,
    [props.pokemon]
  )

  const pokemonStats = useMemo(
    () => [
      { stat: Stat.HP, value: pokemon.hp },
      { stat: Stat.DEF, value: pokemon.def },
      { stat: Stat.ATK, value: pokemon.atk },
      { stat: Stat.RANGE, value: pokemon.range },
      { stat: Stat.PP, value: pokemon.maxPP },
      { stat: Stat.SPE_DEF, value: pokemon.speDef },
      { stat: Stat.SPEED, value: pokemon.speed }
    ],
    [
      pokemon.atk,
      pokemon.def,
      pokemon.hp,
      pokemon.maxPP,
      pokemon.range,
      pokemon.speed,
      pokemon.speDef
    ]
  )

  let dish = DishByPkm[pokemon.name]
  if (!dish && pokemon.types.has(Synergy.GOURMET)) {
    if (pokemon.items.has(Item.COOKING_POT)) {
      dish = Item.HEARTY_STEW
    } else if (pokemon.name !== Pkm.GUZZLORD) {
      dish = Item.SANDWICH
    }
  }

  return (
    <div className="game-pokemon-detail in-shop">
      <PokemonPortrait
        className="game-pokemon-detail-portrait"
        style={{ borderColor: RarityColor[pokemon.rarity] }}
        portrait={{
          index: pokemon.index,
          shiny: props.shiny ?? pokemon.shiny,
          emotion: props.emotion ?? pokemon.emotion
        }}
      />
      <div className="game-pokemon-detail-entry">
        <p className="game-pokemon-detail-entry-name">
          {t(`pkm.${pokemon.name}`)}
        </p>
        <p
          className="game-pokemon-detail-entry-rarity"
          style={{ color: RarityColor[pokemon.rarity] }}
        >
          {t(`rarity.${pokemon.rarity}`)}
        </p>
        <p className="game-pokemon-detail-entry-tier">
          {Array.from({ length: pokemon.stars }, (_, index) => (
            <img key={index} src="assets/ui/star.svg" height="16"></img>
          ))}
          {Array.from(
            { length: getPokemonData(pokemon.name).stages - pokemon.stars },
            (_, index) => (
              <img key={index} src="assets/ui/star_empty.svg" height="16"></img>
            )
          )}
        </p>
      </div>

      <div className="game-pokemon-detail-types">
        {Array.from(pokemon.types.values()).map((type) => (
          <SynergyIcon type={type} key={type} />
        ))}
      </div>

      <div className="game-pokemon-detail-stats">
        {pokemonStats.map(({ stat, value }) => (
          <div key={stat} className={"game-pokemon-detail-stat-" + stat.toLowerCase()}>
            <img
              src={`assets/icons/${stat}.png`}
              alt={stat}
              title={t(`stat.${stat}`)}
            />
            <span>{value}</span>
          </div>
        ))}
      </div>

      {dish && (
        <div className="game-pokemon-detail-dish">
          <div className="game-pokemon-detail-dish-name">
            <img src="assets/ui/dish.svg" /><i>{t("signature_dish")}:</i> {t(`item.${dish}`)}
          </div>
          <img
            src={`assets/item/${dish}.png`}
            className="game-pokemon-detail-dish-icon"
            alt={dish}
            title={t(`item.${dish}`)}
          />
          <p>
            {addIconsToDescription(t(`item_description.${dish}`))}
          </p>
        </div>
      )}

      {pokemon.passive !== Passive.NONE && (
        <div className="game-pokemon-detail-passive">
          <p>
            {addIconsToDescription(t(`passive_description.${pokemon.passive}`))}
          </p>
        </div>
      )}

      {pokemon.skill !== Ability.DEFAULT && (
        <div className="game-pokemon-detail-ult">
          <div className="ability-name">{t(`ability.${pokemon.skill}`)}</div>
          <div>
            <AbilityTooltip
              ability={pokemon.skill}
              stats={{ ap: pokemon.ap, luck: pokemon.luck, stars: pokemon.stars, stages: getPokemonData(pokemon.name).stages }}
              key={pokemon.id}
            />
          </div>
        </div>
      )}
    </div>
  )
}
