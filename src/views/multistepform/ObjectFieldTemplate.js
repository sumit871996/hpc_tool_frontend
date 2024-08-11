import classNames from 'classnames';
import isObject from 'lodash/isObject';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import {
    canExpand,
    descriptionId,
    getTemplate,
    getUiOptions,
    titleId,
} from '@rjsf/utils';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import { ConfigConsumer } from 'antd/lib/config-provider/context';

const DESCRIPTION_COL_STYLE = {
    paddingBottom: '8px',
};

/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
export default function ObjectFieldTemplate(props) {
    const {
        description,
        disabled,
        formContext,
        formData,
        idSchema,
        onAddClick,
        properties,
        readonly,
        required,
        registry,
        schema,
        title,
        uiSchema,
    } = props;
    console.log('ObjectFieldTemplate props: ', props);

    const uiOptions = getUiOptions(uiSchema);
    const TitleFieldTemplate = getTemplate('TitleFieldTemplate', registry, uiOptions);
    const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, uiOptions);
    
    // Button templates are not overridden in the uiSchema
    const { ButtonTemplates: { AddButton } } = registry.templates;
    const { colSpan = 24, labelAlign = 'right', rowGutter = 24 } = formContext;

    const findSchema = (element) => element.content.props.schema;
    const findSchemaType = (element) => findSchema(element).type;
    const findUiSchema = (element) => element.content.props.uiSchema;
    const findUiSchemaField = (element) => getUiOptions(findUiSchema(element)).field;
    const findUiSchemaWidget = (element) => getUiOptions(findUiSchema(element)).widget;

    const calculateColSpan = (element) => {
        const type = findSchemaType(element);
        const field = findUiSchemaField(element);
        const widget = findUiSchemaWidget(element);

        const defaultColSpan =
            properties.length < 2 || // Single or no field in object.
            type === 'object' ||
            type === 'array' ||
            widget === 'textarea'
                ? 24
                : 12;

        if (isObject(colSpan)) {
            const colSpanObj = colSpan;
            if (isString(widget)) {
                return colSpanObj[widget];
            }
            if (isString(field)) {
                return colSpanObj[field];
            }
            if (isString(type)) {
                return colSpanObj[type];
            }
        }
        if (isNumber(colSpan)) {
            return colSpan;
        }
        return defaultColSpan;
    };

    return (
        <ConfigConsumer>
            {(configProps) => {
                console.log('config props are', configProps);
                const { getPrefixCls } = configProps;
                const prefixCls = getPrefixCls('form');
                const labelClsBasic = `${prefixCls}-item-label`;
                const labelColClassName = classNames(
                    labelClsBasic,
                    labelAlign === 'left' && `${labelClsBasic}-left`
                );

                return (
                    <fieldset id={idSchema.$id}>
                        <Row gutter={rowGutter}>
                            {title && (
                                <Col className={labelColClassName} span={24}>
                                    <TitleFieldTemplate
                                        id={titleId(idSchema)}
                                        title={title}
                                        required={required}
                                        schema={schema}
                                        uiSchema={uiSchema}
                                        registry={registry}
                                    />
                                </Col>
                            )}
                            {description && (
                                <Col span={24} style={DESCRIPTION_COL_STYLE}>
                                    <DescriptionFieldTemplate
                                        id={descriptionId(idSchema)}
                                        description={description}
                                        schema={schema}
                                        uiSchema={uiSchema}
                                        registry={registry}
                                    />
                                </Col>
                            )}
                            {uiSchema?.['ui:grid'] && Array.isArray(uiSchema['ui:grid']) ?
                                uiSchema['ui:grid'].map((ui_row) => {
                                    return Object.keys(ui_row).map((row_item) => {
                                        let element = properties.find((p => p.name == row_item));
                                        if (element) {
                                            return <Col key={element.name} span={ui_row[row_item]}>
                                                {element.content}
                                            </Col>;
                                        } else {
                                            return <></>;
                                        }
                                    });
                                })
                                : properties
                                    .filter((e) => !e.hidden)
                                    .map((element) => (
                                        <Col key={element.name} span={calculateColSpan(element)}>
                                            {element.content}
                                        </Col>
                                    ))}
                        </Row>

                        {canExpand(schema, uiSchema, formData) && (
                            <Col span={24}>
                                <Row gutter={rowGutter} justify='end'>
                                    <Col flex='192px'>
                                        <AddButton
                                            className='object-property-expand'
                                            disabled={disabled || readonly}
                                            onClick={onAddClick(schema)}
                                            uiSchema={uiSchema}
                                            registry={registry}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        )}
                    </fieldset>
                );
            }}
        </ConfigConsumer>
    );
}
