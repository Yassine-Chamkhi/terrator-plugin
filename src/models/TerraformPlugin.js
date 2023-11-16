import {
  DefaultPlugin,
} from 'leto-modelizer-plugin-core';
import TerraformDrawer from '../draw/TerraformDrawer';
import TerraformMetadata from '../metadata/TerraformMetadata';
import TerraformParser from '../parser/TerraformParser';
import TerraformRenderer from '../render/TerraformRenderer';
import TerraformConfiguration from './TerraformConfiguration';
import TerraformData from './TerraformData';
import packageInfo from '../../package.json';

/**
 * Terraform plugin.
 */
class TerraformPlugin extends DefaultPlugin {
  /**
   * Default constructor.
   * @param {object} [props] - Object that contains all properties to set.
   * @param {object} [props.event] - Event manager.
   * @param {Function} [props.event.next] - Function to emit event.
   */
  constructor(props = {
    event: null,
  }) {
    const configuration = new TerraformConfiguration({
      defaultFileName: 'new_file.tf',
      defaultFileExtension: 'tf',
    });
    const pluginData = new TerraformData(configuration, {
      name: packageInfo.name,
      version: packageInfo.version,
    }, props.event);

    super({
      pluginData,
      pluginDrawer: new TerraformDrawer(pluginData),
      pluginMetadata: new TerraformMetadata(pluginData),
      pluginParser: new TerraformParser(pluginData),
      pluginRenderer: new TerraformRenderer(pluginData),
      configuration,
    });
  }
}

export default TerraformPlugin;
