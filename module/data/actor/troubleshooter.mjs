import { resourceField, skillField } from "../index.mjs";
import { SystemSettingsKeys } from "../../settings/settings.mjs";

export class ParanoiaTroubleshooterData extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        const { SchemaField, NumberField, StringField } = foundry.data.fields;
        const maximumMoxie = game.settings.get(SystemSettingsKeys.SYSTEM, SystemSettingsKeys.MAXIMUM_MOXIE);
        const startingXP = game.settings.get(SystemSettingsKeys.SYSTEM, SystemSettingsKeys.STARTING_XP);

        return {
            health: resourceField(4, 4),
            flag: resourceField(0, 4),
            moxie: resourceField(8, maximumMoxie),
            team: new StringField(),
            mbd: new StringField(),
            serviceGroup: new StringField(),
            treasonButton: new StringField(),
            violenceButton: new StringField(),
            abilities: new SchemaField({
                brains: new SchemaField({
                    label: new StringField({ initial: game.i18n.localize("PARANOIA.brains") }),
                    value: new NumberField({ initial: 0 }),
                    skills: new SchemaField({
                        alphaComplex: skillField(game.i18n.localize("PARANOIA.alphaComplex"), 0),
                        bureaucracy: skillField(game.i18n.localize("PARANOIA.bureaucracy"), 0),
                        psychology: skillField(game.i18n.localize("PARANOIA.psychology"), 0),
                        science: skillField(game.i18n.localize("PARANOIA.science"), 0)
                    })
                }),
                chutzpah: new SchemaField({
                    label: new StringField({ initial: game.i18n.localize("PARANOIA.chutzpah") }),
                    value: new NumberField({ initial: 0 }),
                    skills: new SchemaField({
                        bluff: skillField(game.i18n.localize("PARANOIA.bluff"), 0),
                        charm: skillField(game.i18n.localize("PARANOIA.charm"), 0),
                        intimidate: skillField(game.i18n.localize("PARANOIA.intimidate"), 0),
                        stealth: skillField(game.i18n.localize("PARANOIA.stealth"), 0)
                    })
                }),
                mechanics: new SchemaField({
                    label: new StringField({ initial: game.i18n.localize("PARANOIA.mechanics") }),
                    value: new NumberField({ initial: 0 }),
                    skills: new SchemaField({
                        demolitions: skillField(game.i18n.localize("PARANOIA.demolitions"), 0),
                        engineer: skillField(game.i18n.localize("PARANOIA.engineer"), 0),
                        operate: skillField(game.i18n.localize("PARANOIA.operate"), 0),
                        program: skillField(game.i18n.localize("PARANOIA.program"), 0)
                    })
                }),
                violence: new SchemaField({
                    label: new StringField({ initial: game.i18n.localize("PARANOIA.violence") }),
                    value: new NumberField({ initial: 0 }),
                    skills: new SchemaField({
                        athletics: skillField(game.i18n.localize("PARANOIA.athletics"), 0),
                        guns: skillField(game.i18n.localize("PARANOIA.guns"), 2),
                        melee: skillField(game.i18n.localize("PARANOIA.melee"), 0),
                        throw: skillField(game.i18n.localize("PARANOIA.throw"), 0)
                    })
                })
            }),
            xp: new NumberField({ initial: startingXP }),
            missionObjectives: new StringField({ initial: game.i18n.localize("PARANOIA.missionObjectives") }),
            assignedGear: new StringField({ initial: game.i18n.localize("PARANOIA.assignedGear") }),
            secrets: new SchemaField({
                aliases: new StringField({ initial: game.i18n.localize("PARANOIA.aliases") }),
                secretObjective: new StringField({ initial: game.i18n.localize("PARANOIA.secretObjective") }),
                serviceGroupFavors: new StringField({ initial: game.i18n.localize("PARANOIA.serviceGroupFavors") }),
                secretSociety: new StringField({ initial: game.i18n.localize("PARANOIA.secretSociety") }),
                mutantPower: new StringField({ initial: game.i18n.localize("PARANOIA.mutantPower") }),
                secretSocietyFavors: new StringField({ initial: game.i18n.localize("PARANOIA.secretSocietyFavors") }),
                treasonousGear: new StringField({ initial: game.i18n.localize("PARANOIA.treasonousGear") }),
                evidence: new StringField({ initial: game.i18n.localize("PARANOIA.evidence") }),
                notes: new StringField({ initial: game.i18n.localize("PARANOIA.notes") })
            })
        }
    }

    static migrateData(source) {
        const maximumMoxie = game.settings.get(SystemSettingsKeys.SYSTEM, SystemSettingsKeys.MAXIMUM_MOXIE);
        if (source.moxie.value > maximumMoxie) {
            source.moxie.max = maximumMoxie;
        }
        if (source.moxie.value > source.moxie.max) {
            source.moxie.value = source.moxie.max;
        }
        return super.migrateData(source);
    }
}
