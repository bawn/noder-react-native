//
//  LCPDisplayNode.m
//  Test
//
//  Created by bawn on 31/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import "LCPDisplayNode.h"
#import "LCNetworkImageNode.h"
#import "LCPTextNode.h"
#import "NSMutableAttributedString+LCLineSpace.h"
#import "NSString+LCAdditional.h"
#import "LCCodeDisplayNode.h"

#import <HTMLKit/HTMLKit.h>
#import "EXTScope.h"

static CGFloat const kBottomSpaceValue = 20.0f;

@interface LCPDisplayNode ()<ASNetworkImageNodeDelegate>

@property (nonatomic, strong) NSMutableArray<ASDisplayNode *> *nodeArray;
@property (nonatomic, strong) NSMutableArray *layoutArray;

@end

@implementation LCPDisplayNode

- (instancetype)initWithContent:(HTMLElement *)htmlNode delegate:(id)delegate{
    self = [super init];
    if (self) {
        
        self.layoutArray = [NSMutableArray array];
        self.nodeArray = [NSMutableArray array];
        
        NSPredicate *imgTagPredicate = [NSPredicate predicateWithFormat:@"name ==[c] %@", @"img"];
        NSOrderedSet *imgTagArray = [htmlNode.childNodes filteredOrderedSetUsingPredicate:imgTagPredicate];
        if (imgTagArray.count) {
            [htmlNode.childNodes enumerateObjectsUsingBlock:^(HTMLNode * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
                if ([obj.name isEqualToString:@"#text"]) {
                   [self addPTextNode:htmlNode delegate:delegate];
                }
                else if ([obj.name isEqualToString:@"img"]){
                    LCNetworkImageNode *node = [[LCNetworkImageNode alloc] init];
                    node.delegate = self;
                    HTMLElement *element = (HTMLElement *)obj;
                    NSString *urlString = element.attributes[@"src"];
                    if (![urlString hasPrefix:@"http"]) {
                        urlString = [NSString stringWithFormat:@"https:%@",  urlString];
                    }
                    node.URL = [NSURL URLWithString:urlString];
                    [self addSubnode:node];
                    [self.nodeArray addObject:node];
                }
                else if ([obj.name isEqualToString:@"code"]){
                    LCCodeDisplayNode *node = [[LCCodeDisplayNode alloc] initWithContent:obj];
                    [self addSubnode:node];
                    [self.nodeArray addObject:node];
                }
            }];
        }
        else{
            [self addPTextNode:htmlNode delegate:delegate];
        }
    }
    return self;
}


- (void)addPTextNode:(HTMLNode *)htmlNode delegate:(id)delegate{
    LCPTextNode *node = [[LCPTextNode alloc] init];
    NSString *textContent = [htmlNode.textContent stringDeleteHTLineFeed];
    NSPredicate *aTagPredicate = [NSPredicate predicateWithFormat:@"name ==[c] %@", @"a"];
    NSOrderedSet *aTagOrderedSet = [htmlNode.childNodes filteredOrderedSetUsingPredicate:aTagPredicate];
    
    NSArray *aTagArray = [aTagOrderedSet.array valueForKeyPath:@"textContent"];
    NSArray *hrefArray = [aTagOrderedSet.array valueForKeyPath:@"attributes.href"];
    
    node.attributedText = [NSMutableAttributedString attributedWithPString:textContent
                                                              aStringArray:aTagArray
                                                                 hrefArray:hrefArray];
    node.delegate = delegate;
    [self addSubnode:node];
    [self.nodeArray addObject:node];
}

- (ASLayoutSpec *)layoutSpecThatFits:(ASSizeRange)constrainedSize{
    [self.layoutArray removeAllObjects];
    [self.nodeArray enumerateObjectsUsingBlock:^(ASDisplayNode * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if ([obj isKindOfClass:[LCNetworkImageNode class]]) {
            LCNetworkImageNode *imageNode = (LCNetworkImageNode *)obj;
            ASRatioLayoutSpec *ratioLayout = [ASRatioLayoutSpec ratioLayoutSpecWithRatio:imageNode.sizeRate child:obj];
            ratioLayout.style.spacingAfter = kBottomSpaceValue;
            [self.layoutArray addObject:ratioLayout];
        }
        else if ( [obj isKindOfClass:[LCPTextNode class]]){
            LCPTextNode *textNode = (LCPTextNode *)obj;
            textNode.style.spacingAfter = kBottomSpaceValue;
            [self.layoutArray addObject:textNode];
        }
        else if ( [obj isKindOfClass:[LCCodeDisplayNode class]]){
            LCCodeDisplayNode *codeNode = (LCCodeDisplayNode *)obj;
            codeNode.style.spacingAfter = kBottomSpaceValue;
            [self.layoutArray addObject:codeNode];
        }
        else{
            [self.layoutArray addObject:obj];
        }
    }];
    
    ASStackLayoutSpec *layout = [ASStackLayoutSpec verticalStackLayoutSpec];
    layout.justifyContent = ASStackLayoutJustifyContentStart;
    layout.alignItems = ASStackLayoutAlignItemsStretch;
    layout.children = self.layoutArray;
    ASInsetLayoutSpec *insetLayout = [ASInsetLayoutSpec insetLayoutSpecWithInsets:UIEdgeInsetsZero child:layout];
    return insetLayout;
}


- (void)imageNode:(LCNetworkImageNode *)imageNode didLoadImage:(UIImage *)image{
    if (image && image.size.width) {
        imageNode.sizeRate = image.size.height / image.size.width;
        [self setNeedsLayout];
    }
    @weakify(imageNode);
    imageNode.animatedImage.coverImageReadyCallback = ^(UIImage *image){
        @strongify(imageNode);
        if (image && image.size.width) {
            imageNode.sizeRate = image.size.height / image.size.width;
            [self setNeedsLayout];
        }
    };
}

- (void)imageNode:(ASNetworkImageNode *)imageNode didFailWithError:(NSError *)error{
    
}



@end
