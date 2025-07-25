import React from "react"
import { useTranslation } from "react-i18next"
import { Status } from "../../../../../types/enum/Status"
import { addIconsToDescription } from "../../utils/descriptions"

export default function WikiStatus() {
  const { t } = useTranslation()
  const statusList: Status[] = [
    Status.BURN,
    Status.POISONNED,
    Status.PARALYSIS,
    Status.FREEZE,
    Status.SLEEP,
    Status.CONFUSION,
    Status.ARMOR_BREAK,
    Status.FATIGUE,
    Status.SILENCE,
    Status.CURSE,
    Status.WOUND,
    Status.FLINCH,
    Status.BLINDED,
    Status.LOCKED,
    Status.CHARM,
    Status.POSSESSED,
    Status.PROTECT,
    Status.RESURECTION,
    Status.RUNE_PROTECT,
    Status.RAGE,
    Status.POKERUS,
    Status.ELECTRIC_FIELD,
    Status.FAIRY_FIELD,
    Status.GRASS_FIELD,
    Status.PSYCHIC_FIELD
  ]
  return (
    <ul className="wiki-status">
      {statusList.map((status) => (
        <li key={status} className="my-box">
          <img src={`assets/status/demo/${status}.gif`} alt={status} />
          <h2>{addIconsToDescription(status)}</h2>
          <p className="description">
            {addIconsToDescription(t(`status_description.${status}`))}
          </p>
        </li>
      ))}
    </ul>
  )
}
